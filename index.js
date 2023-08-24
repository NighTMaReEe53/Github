const theInp = document.querySelector(".repo-data input"),
  theBtn = document.querySelector(".repo-data .theBtn"),
  theResult = document.querySelector(".result");



theBtn.addEventListener("click", () => {
  // Trigger Function
  getData();
});

function getData() {
  // Get Value
  let theValue = theInp.value.trim();
  // If Not Write Name Show Add theResultDiv Message
  if (theValue == "") {
    theResult.innerHTML = "<span>Please Enter UserName Github First</span>"
  } else {
    // Clear TheResult Div
    theResult.innerHTML = "";
    // Fetch Data
    fetch(`https://api.github.com/users/${theValue}/repos`)
      .then(theRespon => {
        let theData = theRespon.json();
        // Return data
        return theData
      }).then(dataRepos => {
        console.log(dataRepos);
        // loop On data
        dataRepos.forEach((data) => {
          // Create Div
          let mainDiv = document.createElement("div");
          // Add Class To Div
          mainDiv.className = "repo-details";
          // Create h2 Element
          let theHeading = document.createElement("h2");
          // Create h2 text
          let theHeadText = document.createTextNode(data.name);
          // Append
          theHeading.appendChild(theHeadText);
          // Append Heading To mainDiv
          mainDiv.appendChild(theHeading);
          // Create Div With ClassName Box
          let theBox = document.createElement("div");
          theBox.className = "box";
          // Create a Link
          let aLink = document.createElement("a");
          aLink.appendChild(document.createTextNode("Visit"))
          aLink.href = `https://github.com/${theValue}/${data.name}`;
          // Add Attribute _black To a For Open Page In New Page
          aLink.setAttribute("target", "_blank");
          // append aLink To theBox
          theBox.appendChild(aLink);
          // create Star With Text
          let theStar = document.createElement("span");
          theStar.appendChild(
            document.createTextNode(`Star : ${data.stargazers_count}`)
          );
          // Append start To Box
          theBox.appendChild(theStar);
          // Append theBox to mainDiv
          mainDiv.appendChild(theBox);
          // Append MainDiv To theResult Area
          theResult.appendChild(mainDiv);
        });
      });
  }
}