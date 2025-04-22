export default function Students({ params }: { params: { id: string } }) {
    return (
      <main>
        <h1>Profil étudiant pour l&nbsp;étudiant numéro {params.id}</h1>
        {/* Profil de l'étudiant avec id: {params.id} */}
        {/* Bio, book, liens */}
      </main>
    );
  }