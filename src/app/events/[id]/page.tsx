export default function Events({ params }: { params: { id: string } }) {
    return (
      <main>
        <h1>Evenement numéro {params.id}</h1>
        {/* evenement avec id: {params.id} */}
        {/* Bio, book, liens */}
      </main>
    );
  }