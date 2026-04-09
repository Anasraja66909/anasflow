export default function OrganizationPage() {
  return (
    <div className="max-w-md mx-auto py-16">
      <h1 className="text-2xl font-bold mb-6">Create Organization</h1>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Organization Name"
          className="w-full border rounded-lg px-4 py-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold"
        >
          Create
        </button>
      </form>
    </div>
  );
}
