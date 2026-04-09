-- AnasFlow Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Clients table (Clients managed by the agency)
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agency_id UUID REFERENCES users(id) ON DELETE CASCADE, -- The User is the Agency
    name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    email VARCHAR(255),
    website VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'inactive', 'churned'
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Platforms table (Connected services for a specific client)
CREATE TABLE platforms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE, -- Agency ID for RLS convenience
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    platform_type VARCHAR(50) NOT NULL, -- 'gohighlevel', 'manychat', 'hubspot', 'waalaxy', 'activecampaign'
    platform_name VARCHAR(100),
    api_key TEXT, -- Store encrypted in production!
    api_endpoint TEXT, -- For self-hosted instances (n8n)
    is_active BOOLEAN DEFAULT TRUE,
    last_sync_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Automations table (Workflows, AI chats, Campaigns)
CREATE TABLE automations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE, -- Agency ID
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    platform_id UUID REFERENCES platforms(id) ON DELETE CASCADE,
    platform_automation_id VARCHAR(255), -- ID from external platform
    automation_type VARCHAR(50) NOT NULL, -- 'workflow', 'ai_chat', 'zap', 'scenario'
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'paused', 'failed'
    
    -- Metrics
    executions_today INT DEFAULT 0,
    executions_month INT DEFAULT 0,
    success_rate DECIMAL(5,2),
    cost_month DECIMAL(10,2) DEFAULT 0,
    cost_today DECIMAL(10,2) DEFAULT 0,
    avg_execution_time_ms INT,
    last_run_at TIMESTAMP,
    
    -- Metadata (JSON for platform-specific data)
    metadata JSONB,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Unique constraint to prevent duplicates
    UNIQUE(user_id, platform_id, platform_automation_id)
);

-- Usage logs table (Track detailed usage)
CREATE TABLE usage_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    automation_id UUID REFERENCES automations(id) ON DELETE CASCADE,
    platform_type VARCHAR(50),
    
    -- AI platforms
    tokens_used INT,
    model_used VARCHAR(100),
    
    -- Workflow platforms
    execution_time_ms INT,
    success BOOLEAN,
    error_message TEXT,
    
    cost DECIMAL(10,4),
    logged_at TIMESTAMP DEFAULT NOW()
);

-- Alerts table
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    automation_id UUID REFERENCES automations(id) ON DELETE CASCADE,
    alert_type VARCHAR(50) NOT NULL, -- 'automation_failed', 'cost_spike', 'slow_execution'
    severity VARCHAR(20) DEFAULT 'warning', -- 'info', 'warning', 'critical'
    message TEXT NOT NULL,
    is_resolved BOOLEAN DEFAULT FALSE,
    resolved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table (for Stripe)
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plan VARCHAR(20) NOT NULL, -- 'basic', 'pro', 'business'
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'canceled', 'past_due'
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255),
    current_period_start TIMESTAMP,
    current_period_end TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_clients_agency_id ON clients(agency_id);
CREATE INDEX idx_platforms_client_id ON platforms(client_id);
CREATE INDEX idx_platforms_user_id ON platforms(user_id);
CREATE INDEX idx_automations_client_id ON automations(client_id);
CREATE INDEX idx_automations_user_id ON automations(user_id);
CREATE INDEX idx_automations_platform_id ON automations(platform_id);
CREATE INDEX idx_automations_status ON automations(status);
CREATE INDEX idx_usage_logs_automation_id ON usage_logs(automation_id);
CREATE INDEX idx_usage_logs_logged_at ON usage_logs(logged_at);
CREATE INDEX idx_alerts_user_id ON alerts(user_id);
CREATE INDEX idx_alerts_is_resolved ON alerts(is_resolved);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to auto-update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_automations_updated_at BEFORE UPDATE ON automations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Users can only access their own data)

-- Users can select their own data
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid() = id);

-- Clients policies
CREATE POLICY "Users can view own clients" ON clients
    FOR SELECT USING (auth.uid() = agency_id);
    
CREATE POLICY "Users can insert own clients" ON clients
    FOR INSERT WITH CHECK (auth.uid() = agency_id);
    
CREATE POLICY "Users can update own clients" ON clients
    FOR UPDATE USING (auth.uid() = agency_id);
    
CREATE POLICY "Users can delete own clients" ON clients
    FOR DELETE USING (auth.uid() = agency_id);

-- Platforms policies
CREATE POLICY "Users can view own platforms" ON platforms
    FOR SELECT USING (auth.uid() = user_id);
    
CREATE POLICY "Users can insert own platforms" ON platforms
    FOR INSERT WITH CHECK (auth.uid() = user_id);
    
CREATE POLICY "Users can update own platforms" ON platforms
    FOR UPDATE USING (auth.uid() = user_id);
    
CREATE POLICY "Users can delete own platforms" ON platforms
    FOR DELETE USING (auth.uid() = user_id);

-- Automations policies
CREATE POLICY "Users can view own automations" ON automations
    FOR SELECT USING (auth.uid() = user_id);
    
CREATE POLICY "Users can insert own automations" ON automations
    FOR INSERT WITH CHECK (auth.uid() = user_id);
    
CREATE POLICY "Users can update own automations" ON automations
    FOR UPDATE USING (auth.uid() = user_id);

-- Alerts policies
CREATE POLICY "Users can view own alerts" ON alerts
    FOR SELECT USING (auth.uid() = user_id);

-- Subscriptions policies
CREATE POLICY "Users can view own subscription" ON subscriptions
    FOR SELECT USING (auth.uid() = user_id);

-- Insert demo data (Optional - for testing)
-- Run this after creating a user through the API

/*
INSERT INTO users (email, password_hash, full_name, company_name) VALUES
('demo@anasflow.com', '$2b$12$demo_hash_here', 'Demo User', 'Demo Company');

-- Get the user_id from the insert above, then:

INSERT INTO platforms (user_id, platform_type, platform_name, api_key) VALUES
('user_id_here', 'claude', 'Claude AI', 'demo_api_key'),
('user_id_here', 'openai', 'ChatGPT', 'demo_api_key');

-- Then insert some demo automations...
*/
