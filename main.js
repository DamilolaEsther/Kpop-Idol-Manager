let idolArray = [...getIdols()];
let selectedIdolId = null;

function displayIdols() {
  $("#idolList").empty();

  idolArray.forEach(function(idol) {
    let idolDiv = $("<div>").addClass("idol");
    idolDiv.append(`<h3>${idol.name} (${idol.group})</h3>`);
    idolDiv.append(`<img src="${idol.imageUrl}" onerror="this.src='https://via.placeholder.com/150'" width="150">`);
    idolDiv.append(`<p>Position: ${idol.position}</p>`);
    idolDiv.append(`<p>Debut Year: ${idol.debutYear}</p>`);
    
    let editBtn = $("<button>").text("Edit Idol");
    editBtn.click(function() {
      selectIdol(idol.id);
    });

    idolDiv.append(editBtn);
    $("#idolList").append(idolDiv);
  });
}

function selectIdol(id) {
  selectedIdolId = id;
  const idol = idolArray.find(i => i.id === id);
  if (idol) {
    $("#editGroupInput").val(idol.group);
    $("#editPositionInput").val(idol.position);
    $("#selectedIdolSection").show();
    $("#deleteMessage").text("");
  }
}

$("#addIdolBtn").click(function() {
  const name = $("#nameInput").val();
  const group = $("#groupInput").val();
  const position = $("#positionInput").val();
  const debutYear = parseInt($("#debutYearInput").val());
  const imageUrl = $("#imageUrlInput").val();

  if (name && group && position && debutYear && imageUrl) {
    const newIdol = {
      id: Date.now(),
      name,
      group,
      position,
      debutYear,
      imageUrl
    };

    idolArray.push(newIdol);
    displayIdols();
    $("#createMessage").text("✅ Idol added!");
    $("input").val("");
  } else {
    $("#createMessage").text("❌ Fill in all fields.");
  }
});

$("#updateIdolBtn").click(function() {
  const group = $("#editGroupInput").val();
  const position = $("#editPositionInput").val();

  if (selectedIdolId !== null) {
    const idol = idolArray.find(i => i.id === selectedIdolId);
    if (idol && group && position) {
      idol.group = group;
      idol.position = position;
      displayIdols();
      $("#selectedIdolSection").hide();
    } else {
      alert("Fill both fields to update.");
    }
  }
});

$("#deleteIdolBtn").click(function() {
  if (selectedIdolId !== null) {
    idolArray = idolArray.filter(i => i.id !== selectedIdolId);
    displayIdols();
    $("#selectedIdolSection").hide();
    $("#deleteMessage").text("❌ Idol deleted.");
    selectedIdolId = null;
  }
});

$(document).ready(function() {
  displayIdols();
});
