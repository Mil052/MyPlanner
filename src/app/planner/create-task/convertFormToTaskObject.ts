interface TaskForm {
    hours: {
        from: {
            from_hour: string,
            from_minute: string
        },
        to: {
            to_hour: string,
            to_minute: string
        }
    },
    title: string,
    description: string | null;
    images: (string | null)[];
}
  
export function convertFormIntoTaskLiteral(taskForm: TaskForm) {
    const imgArray: string[] | null = [];
    for (const img of taskForm.images){
        if (img) {
            imgArray.push(img);
        }
    }
    return {
        title: taskForm.title,
        description: taskForm.description,
        from_hour: `${taskForm.hours.from.from_hour}:${taskForm.hours.from.from_minute}`,
        to_hour: `${taskForm.hours.to.to_hour}:${taskForm.hours.to.to_minute}`,
        images: imgArray.length ? imgArray : null
    };
  }  