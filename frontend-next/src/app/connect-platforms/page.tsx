export default function ConnectPlatformsPage() {
  return (
    <div className="max-w-lg mx-auto py-16">
      <h1 className="text-2xl font-bold mb-6">Connect Platforms</h1>
      <div className="space-y-4">
        <div className="bg-card p-6 rounded-lg shadow">
          <div className="font-semibold mb-2">Claude</div>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold w-full">
            Connect
          </button>
        </div>
        <div className="bg-card p-6 rounded-lg shadow">
          <div className="font-semibold mb-2">OpenAI</div>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold w-full">
            Connect
          </button>
        </div>
        <div className="bg-card p-6 rounded-lg shadow">
          <div className="font-semibold mb-2">n8n</div>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold w-full">
            Connect
          </button>
        </div>
        <div className="bg-card p-6 rounded-lg shadow">
          <div className="font-semibold mb-2">Zapier</div>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold w-full">
            Connect
          </button>
        </div>
        <div className="bg-card p-6 rounded-lg shadow">
          <div className="font-semibold mb-2">GoHighLevel</div>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold w-full">
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}
