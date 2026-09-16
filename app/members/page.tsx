import { createClient } from '@/lib/supabase/server'

export default async function MembersPage() {
  const supabase = await createClient()
  
  // Query profiles from your Supabase PostgreSQL database
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Error loading profiles: {error.message}
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Member Directory</h1>
      <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
        {JSON.stringify(profiles, null, 2)}
      </pre>
    </div>
  )
}
