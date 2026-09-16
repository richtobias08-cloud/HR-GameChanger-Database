import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  // 1. Initialize the Supabase server client (Added await here)
  const supabase = await createClient()

  // 2. Fetch data from the training_sessions table
  const { data: sessions, error } = await supabase
    .from('training_sessions')
    .select('*')

  // 3. Handle any connection or query errors
  if (error) {
    return (
      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: 'red' }}>Error connecting to Supabase</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </main>
    )
  }

  // 4. Render the data on the page
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>HR-GameChanger Training Sessions</h1>
      
      {sessions?.length === 0 ? (
        <p>No training sessions found. Add some in your Supabase dashboard!</p>
      ) : (
        <ul style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
          {sessions?.map((session) => (
            <li 
              key={session.id} 
              style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', listStyle: 'none' }}
            >
              <h2>{session.title}</h2>
              <p>{session.description}</p>
              <p><strong>Price:</strong> ₱{session.price}</p>
              <p><strong>Status:</strong> {session.room_status}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
