test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
  });

const SERVER_URL = "http://localhost:4000";


test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  
  const postNoteBody = await postNoteRes.json();
  
  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added successfully.");
  
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
    const deleteAllRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE"
    });
    const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
        method: "GET"
    });
      
    const getAllNotesBody = await getAllNotesRes.json();
      
    expect(getAllNotesRes.status).toBe(200);
    expect(getAllNotesBody.response.length).toBe(0);
});
  
  test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
    const deleteAllRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE"
    });
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    const postNoteRes1 = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title + "1",
            content: content + "1",
        }),
    });
    const postNoteRes2 = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title + "2",
            content: content + "2",
        }),
    });

    const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
        method: "GET"
    });
      
    const getAllNotesBody = await getAllNotesRes.json();
      
    expect(getAllNotesRes.status).toBe(200);
    expect(getAllNotesBody.response.length).toBe(2);
  });
  
  test("/deleteNote - Delete a note", async () => {
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: "Title to delete",
            content: "Content to delete",
        }),
    });
    const postNoteBody = await postNoteRes.json();

    const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
        method: "DELETE",
    });
    const deleteNoteBody = await deleteNoteRes.json();
    expect(deleteNoteRes.status).toBe(200);
    expect(deleteNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} deleted.`);
  });
  
  test("/patchNote - Patch with content and title", async () => {
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: "Title to patch oops",
            content: "Content to patch oops",
        }),
    });
    const postNoteBody = await postNoteRes.json();

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: "Title to patch",
            content: "Content to patch",
        }),
    });

    const patchNoteBody = await patchNoteRes.json();
    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`);
  });
  
  test("/patchNote - Patch with just title", async () => {
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: "Title to patch oops",
            content: "Content to patch",
        }),
    });
    const postNoteBody = await postNoteRes.json();

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: "Title to patch",
        }),
    });

    const patchNoteBody = await patchNoteRes.json();
    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`);
  });
  
  test("/patchNote - Patch with just content", async () => {
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: "Title to patch",
            content: "Content to patch oops",
        }),
    });
    const postNoteBody = await postNoteRes.json();

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content: "Content to patch",
        }),
    });

    const patchNoteBody = await patchNoteRes.json();
    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`);
  });
  
  test("/deleteAllNotes - Delete one note", async () => {
    const deleteAllResFirst = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE"
    });
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    });

    const deleteAllRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE"
    });
    const deleteAllNotesBody = await deleteAllRes.json();
    expect(deleteAllRes.status).toBe(200);
    expect(deleteAllNotesBody.response).toBe("1 note(s) deleted.");
  });
  
  test("/deleteAllNotes - Delete three notes", async () => {
    const deleteAllResFirst = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE"
    });
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    const postNoteRes1 = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title + "1",
            content: content + "1",
        }),
    });
    const postNoteRes2 = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title + "2",
            content: content + "2",
        }),
    });
    const postNoteRes3 = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title + "3",
            content: content + "3",
        }),
    });
    const deleteAllRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE"
    });
    const deleteAllNotesBody = await deleteAllRes.json();
    expect(deleteAllRes.status).toBe(200);
    expect(deleteAllNotesBody.response).toBe("3 note(s) deleted.");
  });
  
  test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: "Title to patch",
            content: "Content to patch oops",
        }),
    });
    const postNoteBody = await postNoteRes.json();

    const updateNoteColorRes = await fetch(`${SERVER_URL}/updateNoteColor/${postNoteBody.insertedId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            color: "#FF0000",
        }),
    });
    const updateNoteColorBody = await updateNoteColorRes.json();
    expect(updateNoteColorRes.status).toBe(200);
    expect(updateNoteColorBody.message).toBe("Note color updated successfully.");
  });