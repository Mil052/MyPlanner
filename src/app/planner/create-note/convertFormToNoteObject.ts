interface NoteForm {
    title: string,
    description: string | null;
    images: string[];
}

  export function convertFormIntoNoteLiteral(noteForm: NoteForm) {
    const imgArray: string[] | null = [];
    for (const img of noteForm.images){
        if (img) {
            imgArray.push(img);
        }
    }
    return {
        title: noteForm.title,
        description: noteForm.description,
        images: imgArray.length ? imgArray : null
    };
  }
  