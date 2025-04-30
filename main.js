  // Initialize the Swiper instance
  const swiper = new Swiper(".swiper", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });

  // Function to select the active template
  function selectActiveTemplate() {
    // Get the active slide (the one currently in view)
    const activeSlide = swiper.slides[swiper.activeIndex];
    
    // Get the template label from the data-template attribute
    const selectedLabel = activeSlide?.getAttribute('data-template');
    
    if (selectedLabel) {
      // Set the value of the hidden input field to the selected template
      document.getElementById('selectedTemplate').value = selectedLabel;
      alert(`Selected: ${selectedLabel}`);
    } else {
      // Show alert if no template is selected
      alert("Please select a template first.");
    }
  }

//Language selector
  document.getElementById('langSelect').addEventListener('change', function() {
    const lang = this.value;
    const t = translations[lang];

    document.getElementById('flag').src = lang === 'fi' ? 'https://flagcdn.com/fi.svg' : 'https://flagcdn.com/gb.svg';

    for (const key in t) {
      const el = document.getElementById(key);
      if (el) el.innerHTML = t[key];
    }
  });

// Preview color updater with automatic font color for buttons
function updatePreviewColors() {
  const mainColor = document.getElementById('mainColor').value;
  const backgroundColor = document.getElementById('backgroundColor').value;
  const buttonColor = document.getElementById('buttonColor').value;

  // Determine optimal text color (black or white) for button
  const buttonTextColor = getContrastYIQ(buttonColor);

  // Apply colors
  document.getElementById('previewHeader').style.backgroundColor = mainColor;
  document.getElementById('previewFooter').style.backgroundColor = mainColor;
  document.getElementById('previewContent').style.backgroundColor = backgroundColor;

  // Apply button color and dynamic font color
  const buttons = [document.getElementById('previewButton1'), document.getElementById('previewButton2')];
  buttons.forEach(btn => {
    btn.style.backgroundColor = buttonColor;
    btn.style.color = buttonTextColor;
  });
}

// Helper function: returns black or white based on background color brightness
function getContrastYIQ(hexcolor) {
  hexcolor = hexcolor.replace("#", "");
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}

  

//Previewer for page (not in use currently)
  function showPreview() {
    document.getElementById('previewName').innerText = document.getElementById('name').value;
    document.getElementById('previewEmail').innerText = document.getElementById('email').value;
    document.getElementById('previewMessage').innerText = document.getElementById('message').value;
    document.getElementById('previewColor').style.backgroundColor = document.getElementById('mainColor').value;
    document.getElementById('previewModal').style.display = 'block';
  }

  let selectedTemplateNumber = null;

function selectTemplate(number) {
  selectedTemplateNumber = number;
  console.log('Template selected:', number);
  // Optional: add some visual indication of selection
}

/* function confirmTemplateSelection() {
  if (selectedTemplateNumber === null) {
    alert("Please select a template first.");
  } else {
    document.getElementById("selectedTemplate").value = "Template " + selectedTemplateNumber;
    alert("Template " + selectedTemplateNumber + " selected!");
  }

*/

// Conditional display functions for template selection
function selectActiveTemplate() {
const activeSlide = document.querySelector('.swiper-slide-active');
const selectedLabel = activeSlide?.getAttribute('data-template');
const extraFieldArtist = document.getElementById("extraFieldArtist");
const extraFieldBasic = document.getElementById("extraFieldBasic");
const extraFieldPhotoUploadSection = document.getElementById("extraFieldPhotoUploadSection");
const extraFieldPhotoUploadSection2 = document.getElementById("extraFieldPhotoUploadSection2");

if (selectedLabel) {
  // Update the hidden input field for selected template
  document.getElementById('selectedTemplate').value = selectedLabel;
  
  // Conditional display logic for templates
  if (selectedLabel === "Template 1 – Simple") {
    extraFieldArtist.style.display = "none";
    extraFieldBasic.style.display = "none";
    extraFieldPhotoUploadSection.style.display = "block"; // Show Simple photo upload
    extraFieldPhotoUploadSection2.style.display = "none"; // Hide Basic photo upload
  } else if (selectedLabel === "Template 2 – Basic") {
    extraFieldArtist.style.display = "none";
    extraFieldBasic.style.display = "block"; // Show Basic Note field
    extraFieldPhotoUploadSection.style.display = "none"; // Hide Simple photo upload
    extraFieldPhotoUploadSection2.style.display = "block"; // Show photo upload with descriptions
  } else if (selectedLabel === "Template 3 – Artist") {
    extraFieldArtist.style.display = "block"; // Show Artist's Note field
    extraFieldBasic.style.display = "none";
    extraFieldPhotoUploadSection.style.display = "block"; // Show Artist photo upload
    extraFieldPhotoUploadSection2.style.display = "none"; // Hide Basic photo upload
  }
} else {
  alert("Please select a template first.");
}
}



// Event listener for Simple & Artist templates (no descriptions)
document.getElementById('uploadButtonSimpleArtist')?.addEventListener('click', function() {
const files = document.getElementById('photoUpload').files;
const maxSizeMB = 3; // 3 Megabytes per file

// Loop through each selected file and upload them
for (let i = 0; i < files.length; i++) {
  const fileSizeMB = files[i].size / (1024 * 1024); // Convert bytes to MB
  if (fileSizeMB > maxSizeMB) {
    alert(`File "${files[i].name}" is too large. Maximum allowed size is ${maxSizeMB} MB.`);
    return; // Stop the upload process if a file is too large
  }

  // Upload file via AJAX (example using Fetch API)
  const formData = new FormData();
  formData.append("file", files[i]);

  fetch("/your-upload-endpoint", {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    // Handle successful upload
    alert(`File ${files[i].name} uploaded successfully!`);
  })
  .catch(error => {
    // Handle upload error
    console.error("Error uploading file:", error);
    alert("File upload failed.");
  });
}
});

// Event listener for Basic template (with descriptions)
document.getElementById('uploadButtonBasic')?.addEventListener('click', function() {
const files = document.getElementById('photoUpload2').files;
const maxSizeMB = 3; // 3 Megabytes per file
const photoDescriptionContainer = document.getElementById("photoDescriptionContainer");

// Clear existing descriptions
photoDescriptionContainer.innerHTML = '';

// Loop through each selected file and upload them
for (let i = 0; i < files.length; i++) {
  const fileSizeMB = files[i].size / (1024 * 1024); // Convert bytes to MB
  if (fileSizeMB > maxSizeMB) {
    alert(`File "${files[i].name}" is too large. Maximum allowed size is ${maxSizeMB} MB.`);
    return; // Stop the upload process if a file is too large
  }

  // Upload file via AJAX (example using Fetch API)
  const formData = new FormData();
  formData.append("file", files[i]);

  fetch("/your-upload-endpoint", {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    // Handle successful upload
    alert(`File ${files[i].name} uploaded successfully!`);
  })
  .catch(error => {
    // Handle upload error
    console.error("Error uploading file:", error);
    alert("File upload failed.");
  });

  // Create a new description field for each valid photo
  const photoDescriptionDiv = document.createElement('div');
  photoDescriptionDiv.classList.add('photo-description');
  
  const descriptionLabel = document.createElement('label');
  descriptionLabel.textContent = `Description for Photo ${i + 1}:`;
  
  const descriptionInput = document.createElement('input');
  descriptionInput.type = 'text';
  descriptionInput.name = `photoDescription${i + 1}`;
  descriptionInput.placeholder = 'Enter a description for this photo';
  
  // Append the label and input to the description container
  photoDescriptionDiv.appendChild(descriptionLabel);
  photoDescriptionDiv.appendChild(descriptionInput);
  photoDescriptionContainer.appendChild(photoDescriptionDiv);
}
});