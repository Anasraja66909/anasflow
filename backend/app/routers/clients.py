from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..api import deps
from ..models.client import Client as ClientModel
from ..models.user import User as UserModel
from ..schemas.client import Client as ClientSchema, ClientCreate

router = APIRouter(prefix="/clients", tags=["Clients"])


@router.post("/", response_model=ClientSchema)
async def create_client(
    client_in: ClientCreate,
    db: Session = Depends(deps.get_db),
    current_user: UserModel = Depends(deps.get_current_user),
):
    """
    Create a new sub-account client linked to the agency (Authenticated User).
    """
    # Senior Developer Standard: Check for naming collisions within agency scope
    existing = (
        db.query(ClientModel)
        .filter(
            ClientModel.agency_id == current_user.id, ClientModel.name == client_in.name
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A client with this name already exists in your agency portfolio.",
        )

    new_client = ClientModel(
        agency_id=current_user.id,
        name=client_in.name,
        company_name=client_in.company_name,
        email=client_in.email,
        website=client_in.website,
        status="active",
    )
    db.add(new_client)
    db.commit()
    db.refresh(new_client)
    return new_client


@router.get("/", response_model=List[ClientSchema])
async def get_clients(
    db: Session = Depends(deps.get_db),
    current_user: UserModel = Depends(deps.get_current_user),
):
    """
    Retrieve all clients associated with the authenticated agency user.
    """
    clients = (
        db.query(ClientModel).filter(ClientModel.agency_id == current_user.id).all()
    )
    return clients


@router.get("/{client_id}", response_model=ClientSchema)
async def get_client(
    client_id: str,
    db: Session = Depends(deps.get_db),
    current_user: UserModel = Depends(deps.get_current_user),
):
    """
    Retrieve a specific client's diagnostic data by ID.
    """
    client = (
        db.query(ClientModel)
        .filter(ClientModel.id == client_id, ClientModel.agency_id == current_user.id)
        .first()
    )

    if not client:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not located within your authorized nodes.",
        )
    return client
