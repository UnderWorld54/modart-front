export default function Students({ params }: { params: { id: string } }) {
    return (
      <main>
        <h1>Admin Students numéro {params.id}</h1>
        {/* Admin evenement avec id: {params.id} */}
        {/* Bio, book, liens */}
      </main>
    );
  }