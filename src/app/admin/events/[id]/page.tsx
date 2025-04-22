export default function Events({ params }: { params: { id: string } }) {
    return (
      <main>
        <h1>Admin Evenement numéro {params.id}</h1>
        {/* Admin evenement avec id: {params.id} */}
        {/* Bio, book, liens */}
      </main>
    );
  }