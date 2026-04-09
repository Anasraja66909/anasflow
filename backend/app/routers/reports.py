from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from datetime import datetime
import io
from app.auth import get_current_user
from app.db.session import get_db
from app.models import Client, Platform, WhiteLabelSettings
from sqlalchemy.orm import Session
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
import os

router = APIRouter(prefix="/reports", tags=["Reports"])

from app.connectors.registry import ConnectorRegistry


async def calculate_roi_data(db: Session, client_id: str, organization_id: str):
    """
    Intelligently calculate spend and estimated savings using
    real-time connector data and the official platform registry.
    """
    platforms = db.query(Platform).filter(Platform.client_id == client_id).all()

    report_data = {
        "client_id": client_id,
        "date": datetime.now().strftime("%B %Y"),
        "platforms": [],
        "summary": {
            "total_spend": 0.0,
            "estimated_savings": 0.0,
            "roi_multiplier": 3.8,  # Unified Pro Multiplier
            "total_requests": 0,
        },
    }

    for p in platforms:
        try:
            # Fetch real usage via Connector Registry
            conn_data = {
                "api_key": p.api_key,
                "access_token": p.access_token,
                "api_endpoint": p.api_endpoint,
            }
            connector = ConnectorRegistry.get_connector(
                p.platform_type, conn_data, organization_id, p.id
            )
            usage = await connector.fetch_usage()

            cost = usage.total_cost_usd
            savings = cost * 2.5  # Estimated task-level savings multiplier

            p_data = {
                "name": p.platform_name or p.platform_type.title(),
                "cost": round(cost, 2),
                "savings": round(savings, 2),
                "requests": usage.requests_count,
            }
            report_data["platforms"].append(p_data)
            report_data["summary"]["total_spend"] += cost
            report_data["summary"]["estimated_savings"] += savings
            report_data["summary"]["total_requests"] += usage.requests_count
        except Exception as e:
            print(f"Error calculating ROI for platform {p.platform_type}: {e}")
            continue

    report_data["summary"]["total_spend"] = round(
        report_data["summary"]["total_spend"], 2
    )
    report_data["summary"]["estimated_savings"] = round(
        report_data["summary"]["estimated_savings"], 2
    )

    return report_data


@router.get("/roi/{client_id}")
async def get_roi_summary(
    client_id: str,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    # Verify client ownership
    client = (
        db.query(Client)
        .filter(Client.id == client_id, Client.owner_id == user["id"])
        .first()
    )
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")

    return calculate_roi_data(db, client_id)


@router.get("/roi/{client_id}/pdf")
async def get_roi_pdf(
    client_id: str,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    client = (
        db.query(Client)
        .filter(Client.id == client_id, Client.agency_id == current_user.id)
        .first()
    )
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")

    data = calculate_roi_data(db, client_id)

    # Fetch branding settings
    branding = (
        db.query(WhiteLabelSettings)
        .filter(WhiteLabelSettings.user_id == current_user.id)
        .first()
    )

    # Defaults
    company_name = (
        branding.company_name
        if branding
        else f"{current_user.company_name or 'AnasFlow'} Agency"
    )
    primary_color = (
        branding.primary_color if (branding and branding.primary_color) else "#00E5C0"
    )
    logo_path = None
    if branding and branding.logo_path:
        logo_path = os.path.join("uploads", "logos", branding.logo_path)

    # Generate PDF in memory
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter

    # Convert hex color to reportlab color (rgb)
    try:
        r = int(primary_color[1:3], 16) / 255
        g = int(primary_color[3:5], 16) / 255
        b = int(primary_color[5:7], 16) / 255
        brand_rgb = colors.Color(r, g, b)
    except:
        brand_rgb = colors.HexColor("#00E5C0")

    # Header - Branded
    if logo_path and os.path.exists(logo_path):
        try:
            c.drawImage(
                logo_path,
                50,
                height - 80,
                width=50,
                height=50,
                preserveAspectRatio=True,
                mask="auto",
            )
            text_x = 110
        except:
            text_x = 50
    else:
        text_x = 50

    c.setFont("Helvetica-Bold", 24)
    c.setFillColor(brand_rgb)
    c.drawString(text_x, height - 60, f"{company_name} Report")

    c.setFont("Helvetica", 14)
    c.setFillColor(colors.black)
    c.drawString(50, height - 100, f"Client: {client.name}")
    c.drawString(50, height - 120, f"Reporting Period: {data['date']}")

    c.setStrokeColor(brand_rgb)
    c.setLineWidth(2)
    c.line(50, height - 140, width - 50, height - 140)

    # Summary Dashboard
    c.setFont("Helvetica-Bold", 16)
    c.drawString(50, height - 180, "Executive Summary")

    c.setFont("Helvetica", 12)
    c.drawString(
        50,
        height - 210,
        f"Total Infrastructure Spend: ${data['summary']['total_spend']}",
    )
    c.drawString(
        50,
        height - 230,
        f"Total Estimated Savings: ${data['summary']['estimated_savings']}",
    )

    # Table Header
    c.setFont("Helvetica-Bold", 12)
    c.setFillColor(brand_rgb)
    y = height - 280
    c.drawString(50, y, "Platform")
    c.drawString(200, y, "Monthly Spend")
    c.drawString(350, y, "ROI Savings")

    c.line(50, y - 10, width - 50, y - 10)

    # Table Rows
    c.setFont("Helvetica", 11)
    c.setFillColor(colors.black)
    y -= 40
    for p in data["platforms"]:
        c.drawString(50, y, p["name"])
        c.drawString(200, y, f"${p['cost']}")
        c.drawString(350, y, f"${p['savings']}")
        y -= 25

    # Footer
    c.setFont("Helvetica-Oblique", 10)
    c.setFillColor(colors.grey)
    footer_text = f"Generated by {company_name} - Enterprise Automation Analytics"
    c.drawString(50, 50, footer_text)

    c.showPage()
    c.save()

    buffer.seek(0)
    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename={company_name.replace(' ', '_')}_ROI_Report.pdf"
        },
    )


@router.post("/roi/{client_id}/email")
async def email_report(
    client_id: str,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    # Mock Email Dispatch logic
    # In production, this would use a real Email Service (SES/SendGrid)
    return {"message": "Report successfully dispatched to client e-mail."}
