import React from 'react';

function CreateJournalPage() {
  return (
    <main>
      <h1>New Page</h1>
      <form>
        <label htmlFor="notes">Notes:</label>
        <textarea id="notes"></textarea>
        <button type="submit"></button>
      </form>
    </main>
  );
}

export default CreateJournalPage;
