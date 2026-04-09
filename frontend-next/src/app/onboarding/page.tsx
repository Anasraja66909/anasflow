export default function OnboardingPage() {
  return (
    <div className="max-w-lg mx-auto py-16">
      <h1 className="text-2xl font-bold mb-6">Welcome to AnasFlow</h1>
      <ol className="space-y-6">
        <li className="bg-card p-6 rounded-lg shadow">
          <div className="font-semibold mb-2">1. Sign up or log in</div>
          <div className="text-muted-foreground">
            Create your account with Google or email.
          </div>
        </li>
        <li className="bg-card p-6 rounded-lg shadow">
          <div className="font-semibold mb-2">2. Create your organization</div>
          <div className="text-muted-foreground">
            Name your agency and invite your team (optional).
          </div>
        </li>
        <li className="bg-card p-6 rounded-lg shadow">
          <div className="font-semibold mb-2">3. Connect platforms</div>
          <div className="text-muted-foreground">
            One-click OAuth or API key for 30+ platforms.
          </div>
        </li>
        <li className="bg-card p-6 rounded-lg shadow">
          <div className="font-semibold mb-2">4. See your live dashboard</div>
          <div className="text-muted-foreground">
            Usage, cost, health, and ROI in one place.
          </div>
        </li>
      </ol>
    </div>
  );
}
