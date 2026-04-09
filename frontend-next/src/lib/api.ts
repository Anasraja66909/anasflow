const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiClient {
  private getToken(): string | null {
    return localStorage.getItem("token");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...((options.headers as Record<string, string>) || {}),
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const fullEndpoint = endpoint.startsWith("/api/v1")
      ? endpoint
      : `/api/v1${endpoint}`;
    const response = await fetch(`${API_URL}${fullEndpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      throw new Error("Session expired");
    }

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ detail: "Something went wrong" }));
      let errorMsg = error.detail || "Request failed";
      if (Array.isArray(errorMsg)) {
        errorMsg = errorMsg
          .map((e: any) => `${e.loc?.slice(-1)?.[0] || "Field"}: ${e.msg}`)
          .join(", ");
      }
      throw new Error(errorMsg);
    }

    return response.json();
  }

  // Auth
  async register(data: { email: string; password: string; full_name: string }) {
    return this.request<{
      access_token: string;
      token_type: string;
      user: any;
    }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async login(data: { email: string; password: string }) {
    const formData = new URLSearchParams();
    formData.append("username", data.email);
    formData.append("password", data.password);
    return this.request<{
      access_token: string;
      token_type: string;
      user: any;
    }>("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });
  }

  async loginWithGoogle(credential: string) {
    return this.request<{
      access_token: string;
      token_type: string;
      user: any;
    }>("/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential }),
    });
  }

  async getMe() {
    return this.request<{ id: string; email: string; full_name: string }>(
      "/auth/me",
    );
  }

  // Dashboard
  async getDashboardStats() {
    return this.request<{
      total_clients: number;
      total_platforms: number;
      total_automations: number;
      active_automations: number;
      failed_automations: number;
      total_cost_month: number;
      health_percentage: number;
      potential_savings: number;
      optimization_suggestions: number;
    }>("/dashboard/stats");
  }

  async getPlatformsData() {
    return this.request<{ platforms: any[] }>("/dashboard/platforms-data");
  }

  // Platforms
  async getPlatforms() {
    return this.request<{ platforms: any[] }>("/platforms");
  }

  // Clients
  async getClients() {
    return this.request<{ clients: any[] }>("/clients");
  }

  async createClient(data: {
    name: string;
    company_name?: string;
    email?: string;
    website?: string;
  }) {
    return this.request<{ message: string; client: any }>("/clients", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async connectPlatform(data: {
    client_id: string;
    platform_type: string;
    api_key: string;
    api_endpoint?: string;
  }) {
    return this.request<{ message: string; platform: any }>(
      "/platforms/connect",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );
  }

  async syncPlatform(id: string) {
    return this.request<{ message: string; metrics: any }>(
      `/platforms/${id}/sync`,
      {
        method: "POST",
      },
    );
  }

  // Optimizations
  async getOptimizations() {
    return this.request<{
      suggestions: Array<{
        title: string;
        description: string;
        current_cost: number;
        optimized_cost: number;
        savings: number;
        action: string;
      }>;
      total_savings: number;
    }>("/optimizations");
  }
  // Billing
  async getBillingOverview() {
    return this.request<any>("/billing/overview");
  }

  async getPaymentMethods() {
    return this.request<any>("/billing/payment-methods");
  }

  async addPaymentMethod(paymentMethodId: string) {
    return this.request<any>(
      `/billing/payment-methods?payment_method_id=${paymentMethodId}`,
      {
        method: "POST",
      },
    );
  }

  async removePaymentMethod(id: string) {
    return this.request<any>(`/billing/payment-methods/${id}`, {
      method: "DELETE",
    });
  }

  async setDefaultPaymentMethod(id: string) {
    return this.request<any>(`/billing/payment-methods/${id}/default`, {
      method: "PUT",
    });
  }

  async getInvoices() {
    return this.request<any>("/billing/invoices");
  }

  async getUsageHistory() {
    return this.request<any>("/billing/usage-history");
  }

  async getSpendAnalytics() {
    return this.request<any>("/billing/spend-analytics");
  }

  async cancelSubscription() {
    return this.request<any>("/billing/cancel", {
      method: "POST",
    });
  }

  async resumeSubscription() {
    return this.request<any>("/billing/resume", {
      method: "POST",
    });
  }
}

export const api = new ApiClient();

// Mock data fallback
export const mockStats = {
  total_clients: 14,
  total_platforms: 28,
  total_automations: 156,
  active_automations: 142,
  failed_automations: 8,
  total_cost_month: 5847.5,
  health_percentage: 95.7,
  potential_savings: 480.0,
  optimization_suggestions: 2,
};

export const mockPlatforms = [
  {
    id: "1",
    platform_type: "gohighlevel",
    platform_name: "GoHighLevel",
    status: "connected",
    last_synced: "2 min ago",
    metrics: { total_workflows: 45, active_workflows: 42, cost_month: 297 },
  },
  {
    id: "2",
    platform_type: "hubspot",
    platform_name: "HubSpot",
    status: "connected",
    last_synced: "5 min ago",
    metrics: { total_workflows: 28, active_workflows: 25, cost_month: 320 },
  },
  {
    id: "3",
    platform_type: "n8n",
    platform_name: "n8n",
    status: "connected",
    last_synced: "3 min ago",
    metrics: { total_workflows: 67, active_workflows: 63, cost_month: 89 },
  },
  {
    id: "4",
    platform_type: "zapier",
    platform_name: "Zapier",
    status: "connected",
    last_synced: "1 min ago",
    metrics: { total_zaps: 34, active_zaps: 32, cost_month: 299 },
  },
  {
    id: "5",
    platform_type: "make",
    platform_name: "Make (Integromat)",
    status: "connected",
    last_synced: "8 min ago",
    metrics: { total_scenarios: 19, active_scenarios: 17, cost_month: 145 },
  },
  {
    id: "6",
    platform_type: "openai",
    platform_name: "OpenAI",
    status: "connected",
    last_synced: "immediate",
    metrics: { total_requests: 12450, active_requests: 450, cost_month: 234 },
  },
  {
    id: "7",
    platform_type: "claude",
    platform_name: "Claude.ai",
    status: "connected",
    last_synced: "immediate",
    metrics: { total_requests: 8920, active_requests: 340, cost_month: 178 },
  },
  {
    id: "8",
    platform_type: "gemini",
    platform_name: "Google Gemini",
    status: "connected",
    last_synced: "immediate",
    metrics: { total_requests: 6500, active_requests: 280, cost_month: 95 },
  },
  {
    id: "9",
    platform_type: "instantly",
    platform_name: "Instantly.ai",
    status: "connected",
    last_synced: "4 min ago",
    metrics: { total_campaigns: 42, active_campaigns: 38, cost_month: 99 },
  },
  {
    id: "10",
    platform_type: "elevenlabs",
    platform_name: "ElevenLabs",
    status: "connected",
    last_synced: "6 min ago",
    metrics: {
      total_characters: 1250000,
      active_chars: 50000,
      cost_month: 120,
    },
  },
  {
    id: "11",
    platform_type: "slack",
    platform_name: "Slack",
    status: "connected",
    last_synced: "30 sec ago",
    metrics: { total_messages: 45000, active_messages: 120, cost_month: 67 },
  },
  {
    id: "12",
    platform_type: "stripe",
    platform_name: "Stripe",
    status: "connected",
    last_synced: "1 min ago",
    metrics: {
      total_transactions: 890,
      active_transactions: 12,
      cost_month: 0,
    },
  },
  {
    id: "13",
    platform_type: "shopify",
    platform_name: "Shopify",
    status: "connected",
    last_synced: "2 min ago",
    metrics: { total_orders: 450, active_orders: 5, cost_month: 29 },
  },
  {
    id: "14",
    platform_type: "aws",
    platform_name: "AWS",
    status: "connected",
    last_synced: "immediate",
    metrics: { total_calls: 125000, active_calls: 2400, cost_month: 450 },
  },
  {
    id: "15",
    platform_type: "azure",
    platform_name: "Microsoft Azure",
    status: "connected",
    last_synced: "immediate",
    metrics: { total_compute: 87, active_compute: 12, cost_month: 380 },
  },
  {
    id: "16",
    platform_type: "github",
    platform_name: "GitHub",
    status: "connected",
    last_synced: "30 sec ago",
    metrics: { total_repos: 24, active_repos: 8, cost_month: 21 },
  },
  {
    id: "17",
    platform_type: "notion",
    platform_name: "Notion",
    status: "connected",
    last_synced: "5 min ago",
    metrics: { total_databases: 45, active_databases: 18, cost_month: 10 },
  },
  {
    id: "18",
    platform_type: "salesforce",
    platform_name: "Salesforce",
    status: "connected",
    last_synced: "3 min ago",
    metrics: { total_records: 25000, active_records: 800, cost_month: 500 },
  },
  {
    id: "19",
    platform_type: "mailchimp",
    platform_name: "Mailchimp",
    status: "connected",
    last_synced: "7 min ago",
    metrics: { total_contacts: 125000, active_contacts: 45000, cost_month: 89 },
  },
  {
    id: "20",
    platform_type: "monday",
    platform_name: "Monday.com",
    status: "connected",
    last_synced: "4 min ago",
    metrics: { total_boards: 32, active_boards: 14, cost_month: 168 },
  },
  {
    id: "21",
    platform_type: "asana",
    platform_name: "Asana",
    status: "connected",
    last_synced: "6 min ago",
    metrics: { total_projects: 28, active_projects: 10, cost_month: 99 },
  },
  {
    id: "22",
    platform_type: "airtable",
    platform_name: "Airtable",
    status: "connected",
    last_synced: "2 min ago",
    metrics: { total_bases: 19, active_bases: 8, cost_month: 50 },
  },
  {
    id: "23",
    platform_type: "twilio",
    platform_name: "Twilio",
    status: "connected",
    last_synced: "1 min ago",
    metrics: { total_messages: 45000, active_messages: 340, cost_month: 145 },
  },
  {
    id: "24",
    platform_type: "woocommerce",
    platform_name: "WooCommerce",
    status: "connected",
    last_synced: "3 min ago",
    metrics: { total_products: 1200, active_sales: 15, cost_month: 0 },
  },
  {
    id: "25",
    platform_type: "instagram",
    platform_name: "Instagram Business",
    status: "connected",
    last_synced: "10 min ago",
    metrics: { total_posts: 340, active_followers: 125000, cost_month: 45 },
  },
  {
    id: "26",
    platform_type: "google-sheets",
    platform_name: "Google Sheets",
    status: "connected",
    last_synced: "immediate",
    metrics: { total_sheets: 67, active_sheets: 24, cost_month: 0 },
  },
  {
    id: "27",
    platform_type: "intercom",
    platform_name: "Intercom",
    status: "connected",
    last_synced: "2 min ago",
    metrics: {
      total_conversations: 8900,
      active_conversations: 45,
      cost_month: 299,
    },
  },
  {
    id: "28",
    platform_type: "linear",
    platform_name: "Linear",
    status: "connected",
    last_synced: "5 min ago",
    metrics: { total_issues: 456, active_issues: 23, cost_month: 0 },
  },
];

export const mockOptimizations = {
  suggestions: [
    {
      title: "Migrate Simple Zaps to n8n",
      description:
        "You're spending $299/month on Zapier. Moving simple workflows to n8n (self-hosted or cloud) could save 60-90%.",
      current_cost: 299,
      optimized_cost: 59,
      savings: 240,
      action: "View Migration Guide",
    },
    {
      title: "Switch GPT-4 to GPT-3.5 for simple tasks",
      description:
        "Several of your ChatGPT automations use GPT-4 for simple text formatting. GPT-3.5 handles these identically at 1/10th the cost.",
      current_cost: 89,
      optimized_cost: 45,
      savings: 44,
      action: "Review Tasks",
    },
  ],
  total_savings: 284,
};

export const mockCostTrend = [
  {
    date: "Mar 1",
    zapier: 280,
    n8n: 0,
    chatgpt: 70,
    make: 25,
    claude: 400,
    total: 775,
  },
  {
    date: "Mar 5",
    zapier: 285,
    n8n: 0,
    chatgpt: 75,
    make: 26,
    claude: 410,
    total: 796,
  },
  {
    date: "Mar 10",
    zapier: 290,
    n8n: 0,
    chatgpt: 80,
    make: 27,
    claude: 415,
    total: 812,
  },
  {
    date: "Mar 15",
    zapier: 295,
    n8n: 0,
    chatgpt: 85,
    make: 28,
    claude: 420,
    total: 828,
  },
  {
    date: "Mar 20",
    zapier: 297,
    n8n: 0,
    chatgpt: 87,
    make: 29,
    claude: 425,
    total: 838,
  },
  {
    date: "Mar 25",
    zapier: 299,
    n8n: 0,
    chatgpt: 89,
    make: 29,
    claude: 430,
    total: 847,
  },
];
