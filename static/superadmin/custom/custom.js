//--dealer
$(document).on("click", "#dealer_search", function () {
  dealer_view("None");
});

function searchDealer() {
  dealer_view("None");
}

function dealer_view(data) {
  var page = "1";
  if (data != "None") {
    var page = data;
  }
  console.log("page", page);
  var search = $("#search").val();
  var start = $("#start").val();
  var end = $("#end").val();
  var product = $("#product").val();
  // alert(product);
  var priority = $("#priority").val();
  var executive = $("#executive").val();
  // var assigned = $("#assigned").val();
  var status = $("#status").val();
  var reference = $("#reference").val();
  var dealer = $("#dealer").val();
  var phone = $("#phone").val();
  var campaign = $("#campaign").val();
  var smmads = $("#smmads").val();
  
  console.log(
    start,
    end,
    product,
    priority,
    executive,
    status,
    reference,
    dealer,
    phone,
    campaign,
    smmads
  );
  $.ajax({
    url: "/superadmin/dealer-view",
    type: "GET",
    data: {
      start: start,
      end: end,
      product: product,
      priority: priority,
      executive: executive,
      status: status,
      reference: reference,
      dealer: dealer,
      phone: phone,
      campaign: campaign,
      smmads:smmads,
      search: search,
      page: page,
    },
    success: function (data) {
      $("#dealer-table").html(data.template);
    },
  });
}

function show_modal(id) {
  $("#hid").val(id);
  $("#modaldemo5").modal("show");
}

function confirm_delete_dealer() {
  var page = $("#page").val();
  id = $("#hid").val();
  console.log(id);
  $.ajax({
    url: "/superadmin/dealer-view",
    type: "GET",
    data: { page: page, delete: "1", item_id: id },
    success: function (data) {
      $("#modaldemo5").modal("hide");
      $("#dealer-table").html(data.template);
    },
  });
}

// assigned: assigned,
function showResponseList(id) {
  $("#responseView").modal("show");
  $.ajax({
    url: "/superadmin/show-dealer-responses",
    type: "GET",
    data: { id: id },
    success: function (data) {
      console.log("success");
      $("#responsess").empty();
      $("#responsess").html(data.template);
    },
  });
}




//--client
$(document).on("click", "#client_search", function () {
  client_view("None");
});

function searchClient() {
  client_view("None");
}

function client_view(data) {
  var page = "1";
  if (data != "None") {
    var page = data;
  }
  console.log("page", page);
  var search = $("#search").val();
  var start = $("#start").val();
  var end = $("#end").val();
  var product = $("#product").val();
  // alert(product);
  var priority = $("#priority").val();
  var executive = $("#executive").val();
  // var assigned = $("#assigned").val();
  var status = $("#status").val();
  var reference = $("#reference").val();
  var dealer = $("#dealer").val();
  var phone = $("#phone").val();
  var campaign = $("#campaign").val();
  var smmads = $("#smmads").val();
  
  console.log(
    start,
    end,
    product,
    priority,
    executive,
    status,
    reference,
    dealer,
    phone,
    campaign,
    smmads
  );
  $.ajax({
    url: "/superadmin/client-view",
    type: "GET",
    data: {
      start: start,
      end: end,
      product: product,
      priority: priority,
      executive: executive,
      status: status,
      reference: reference,
      dealer: dealer,
      phone: phone,
      campaign: campaign,
      smmads:smmads,
      search: search,
      page: page,
    },
    success: function (data) {
      $("#client-table").html(data.template);
    },
  });
}

function show_modal(id) {
  $("#hid").val(id);
  $("#modaldemo5").modal("show");
}

function confirm_delete_client() {
  var page = $("#page").val();
  id = $("#hid").val();
  console.log(id);
  $.ajax({
    url: "/superadmin/client-view",
    type: "GET",
    data: { page: page, delete: "1", item_id: id },
    success: function (data) {
      $("#modaldemo5").modal("hide");
      $("#client-table").html(data.template);
    },
  });
}

// assigned: assigned,
function showResponseList(id) {
  $("#responseView").modal("show");
  $.ajax({
    url: "/superadmin/show-client-responses",
    type: "GET",
    data: { id: id },
    success: function (data) {
      console.log("success");
      $("#responsess").empty();
      $("#responsess").html(data.template);
    },
  });
}

//--------bulk Assign Client

function bulkAssign() {
  var executive = $("#bulk_exec").val();
  var checkedValues = [];
  $("input.form-check-input.cbox:checked").each(function () {
    checkedValues.push($(this).val());
  });
  console.log(checkedValues, "checkedValues");
  console.log(executive, "executive");
  var button = $("#bulk_assign");
  button.html(
    '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span><span>Assigning...</span>'
  );
  $.ajax({
    url: "/superadmin/bulk-assign-client",
    type: "GET",
    data: {
      checkedValues: JSON.stringify(checkedValues),
      executive: executive,
    },
    success: function (data) {
      if (data.status) {
        console.log("success");
        window.location.reload();
        $("#bulkSuccess").modal("show");
      } else {
        console.log("failed");
        window.location.reload();
        $("#bulkSuccess").modal("show");
      }
    },
  });
}

function addNewLocation() {
  var location = $("#newLoc").val();
  var csrfToken = $('input[name="csrfmiddlewaretoken"]').val();
  console.log(location);

  $.ajax({
    url: "/superadmin/location-add",
    type: "GET",
    data: { location: location, csrfmiddlewaretoken: csrfToken },
    success: function (data) {
      if (data.status) {
        $("#locationAdd").modal("hide");
        var newOption = $("<option>", {
          value: data.id, // Make sure to send the ID from the server
          text: location,
        });
        $("#loca").append(newOption);
        $("#newLoc").val("");
      } else {
        alert("Failed to add location.please try again...!!!");
      }
    },
  });
}

//--copy to clipboard response
function copyToClipboard(id) {
  var copyText = document.getElementById("responsecopy-" + id).innerText;

  // Create a temporary textarea element to copy text to clipboard
  var tempInput = document.createElement("textarea");
  tempInput.style.position = "absolute";
  tempInput.style.left = "-9999px";
  tempInput.style.top = "0";
  tempInput.value = copyText;
  document.body.appendChild(tempInput);
  tempInput.select();
  tempInput.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  // Show popover notification
  var popoverTrigger = document.getElementById("popover-" + id);
  $(popoverTrigger).popover({
    trigger: "manual",
    content: "Copied to clipboard!",
  });
  $(popoverTrigger).popover("show");

  // Hide popover after a few seconds
  setTimeout(function () {
    $(popoverTrigger).popover("hide");
  }, 3000); // Hide popover after 3 seconds (adjust as needed)
}

//--project section
function getClientId() {
  var clientId = $("#clientId").val();
  console.log(clientId, "id");
  var submitButton = $("#submitButtonn");
  var currentHref = submitButton.attr("href"); // Get the current href value
  var baseUrl = currentHref.split("?")[0]; // Extract the base URL without query parameters
  var newUrl = baseUrl + "?client=" + clientId;
  submitButton.attr("href", newUrl); // Update the href attribute with the new URL
}

//--calculation of total hours while typing in project create
function calculateTotalHours() {
  let total = 0;
  document.querySelectorAll(".hours-field").forEach(function (input) {
    let value = parseFloat(input.value);
    if (!isNaN(value)) {
      total += value;
    }
  });
  document.getElementById("total_hours").value = total;
}

document.addEventListener("input", function (event) {
  if (event.target.classList.contains("hours-field")) {
    calculateTotalHours();
  }
});

//--open department modal in project view

function openDepartmentModal(id) {
  $("#departmentAdd").modal("show");

  $.ajax({
    url: "/superadmin/assign-department-popup/",
    type: "GET",
    data: { id: id },
    success: function (data) {
      $("#departmentPopup").html(data.template);
    },
  });
}

//---Project

$(document).on("click", "#project_search", function () {
  console.log("project");
  project_view("None");
});

function searchProject() {
  project_view("None");
}

function project_view(data) {
  console.log(data);
  var page = "1";
  if (data != "None") {
    var page = data;
  }
  console.log("page", page);
  var search = $("#search").val();
  var start = $("#start_date").val();
  var end = $("#end_date").val();
  var status = $("#status").val();
  var lead = $("#lead").val();
  var project_type = $("#project_type").val();


  console.log(start, end, status, lead);
  $.ajax({
    url: "/superadmin/project-view",
    type: "GET",
    data: {
      start: start,
      end: end,
      status: status,
      lead: lead,
      search: search,
      page: page,
      project_type: project_type,
    },
    success: function (data) {
      $("#project-table").html(data.template);
    },
  });
}

function showProjectDelete(id) {
  $("#projdelete").modal("show");
  $("#hid").val(id);
}

function confirm_delete_project(id) {
  id = $("#hid").val();
  console.log(id);
  $.ajax({
    url: "/superadmin/delete-project",
    type: "GET",
    data: { id: id },
    success: function (data) {
      console.log("success");
      window.location.href = "/superadmin/project-view";
    },
  });
}

//--delete departments while update
$(document).ready(function () {
  $(".delete-spec-btn").on("click", function () {
    var specIndex = $(this).data("spec-index");
    var proj = $("#projectID").val();
    var DepartmentInputId = "#department_" + specIndex;
    var HoursInputId = "#hours_" + specIndex;

    var Department = $(DepartmentInputId).val();
    var Hours = $(HoursInputId).val();

    $.ajax({
      type: "GET",
      url: "/superadmin/delete-project-update-department/",
      data: {
        department: Department,
        hours: Hours,
        project_id: proj,
      },
      success: function (response) {
        if (response.success) {
          // Successfully deleted, remove the corresponding multi-field
          $(DepartmentInputId).closest(".multi-field").remove();
          $(this).remove();
          $("#total_hours").val(response.total_hours);
        } else {
          console.log("Error:", response.error);
        }
      }.bind(this),
    });
  });
});

//delete assigned department from project

function deleteDepartment(id) {
  $.ajax({
    url: "/superadmin/assigned-department-delete",
    type: "GET",
    data: { id: id },
    success: function (data) {
      console.log("success");
      $("#totHour").text(data.total_hours);
      $("#assign" + id).remove();
      $("#dept" + id).remove();
    },
  });
}

//Add collected amount for the project
function collectedAmountAdd(id) {
  $("#Collected").modal("show");
  $("#projct").val(id);
}

//----show collected amount
function showColledAmount(id) {
  $("#Collected_amount").modal("show");
  $.ajax({
    url: "/superadmin/show-collected-amount",
    type: "GET",
    data: { id: id },
    success: function (data) {
      console.log("success");
      $("#amount_lists").html(data.template);
    },
  });
}

//---delete collected amount
function deleteCollectedAmount(id) {
  $.ajax({
    url: "/superadmin/delete-collected-amount",
    type: "GET",
    data: { id: id },
    success: function (data) {
      console.log("success");
      $("#collections" + id).remove();

      if (data.collection_list == 0) {
        $("#no-records-container").append(
          '<p class="text-center">No records available</p>'
        );
      }
    },
  });
}
//Add Project remarks

function addProjectRemarks(id, name) {
  $("#remarksAdd").modal("show");
  $("#projectId").val(id);
  $("#projName").text(name);
}

//---show project remark list from add modal

function showProjectRemarkList() {
  id = $("#projectId").val();
  $("#remarksAdd").modal("hide");
  $("#remark_list").modal("show");
  $.ajax({
    url: "/superadmin/show-project-remarks",
    type: "GET",
    data: { id: id },
    success: function (data) {
      console.log("success");
      $("#showRemark").html(data.template);
    },
  });
}

//---show project remarks
function showRemarkList(id) {
  $("#remark_list").modal("show");
  $.ajax({
    url: "/superadmin/show-project-remarks",
    type: "GET",
    data: { id: id },
    success: function (data) {
      console.log("success");
      $("#showRemark").html(data.template);
    },
  });
}

//-delete project remarks

function deleteRemarks(id) {
  $.ajax({
    url: "/superadmin/delete-project-remarks",
    type: "GET",
    data: { id: id },
    success: function (data) {
      console.log("success");
      $("#remarkss" + id).remove();
      if (data.total_remarks == 0) {
        $("#no-records-container").append(
          '<p class="text-center">No records available</p>'
        );
      }
    },
  });
}

//-----project details report table

function projectReportFilter() {
  var start = $("#RStartDate").val();
  var end = $("#REndDate").val();
  var stage = $("#Rstage").val();
  var status = $("#Rstatus").val();
  var name = $("#Rname").val();
  var project = $("#projId").val();
  // console.log(date,stage,status,name,project);

  $.ajax({
    url: "/superadmin/project-details-report",
    type: "GET",
    data: {
      start: start,
      end: end,
      stage: stage,
      status: status,
      name: name,
      project: project,
    },
    success: function (data) {
      console.log("success");
      $("#project-report").html(data.template);
    },
  });
}

//-------Employee
$(document).on("click", "#employee_search", function () {
  console.log("employee");
  employee_view("None");
});

function searchEmployee() {
  employee_view("None");
}

function employee_view(data) {
  console.log(data);
  var page = "1";
  if (data != "None") {
    var page = data;
  }
  console.log("page", page);
  var search = $("#search").val();
  var join_date = $("#join_date").val();
  var department = $("#department").val();

  console.log(join_date, department);
  $.ajax({
    url: "/superadmin/employee-view",
    type: "GET",
    data: {
      join_date: join_date,
      department: department,
      search: search,
      page: page,
    },
    success: function (data) {
      $("#employee-table").html(data.template);
    },
  });
}

function deleteEmployeeDoc(id) {
  $.ajax({
    url: "/superadmin/delete-employee-doc",
    type: "GET",
    data: { id: id },
    success: function (data) {
      console.log("success");
      $("#doc" + id).remove();
    },
  });
}

function showDeleteEmpPop(id) {
  $("#deleteEmp").modal("show");
  $("#empId").val(id);
}

function confirm_delete_employee() {
  var page = $("#page").val();
  var id = $("#empId").val();
  $.ajax({
    url: "/superadmin/employee-view",
    type: "GET",
    data: { page: page, delete: "1", item_id: id },
    success: function (data) {
      console.log("success");
      $("#deleteEmp").modal("hide");
      $("#employee-table").html(data.template);
    },
  });
}

function showEmployeeReview(id) {
  $("#employeeID").val(id);
  $("#add_review").modal("show");
}

function deleteEmployeeReview(id) {
  $.ajax({
    url: "/superadmin/delete-employee-review",
    type: "GET",
    data: { id: id },
    success: function (data) {
      console.log("success");
      $("#empReview" + id).remove();
      if (data.total_reviews == 0) {
        $("#no-records-container").append(
          '<p class="text-center">No reviews found</p>'
        );
      }
    },
  });
}

//------assign target

$(document).on("click", "#target_search", function () {
  console.log("target");
  target_view("None");
});

function target_view(data) {
  console.log(data);
  var page = "1";
  if (data != "None") {
    var page = data;
  }
  console.log("page", page);
  var year = $("#year").val();
  var month = $("#month").val();
  var employee = $("#employee").val();
  var amount = $("#amount").val();

  console.log(year, month);
  $.ajax({
    url: "/superadmin/assign-target-view",
    type: "GET",
    data: {
      year: year,
      month: month,
      month: month,
      employee: employee,
      amount: amount,
      page: page,
    },
    success: function (data) {
      $("#target-table").html(data.template);
    },
  });
}

function show_modal(id) {
  $("#hid").val(id);
  $("#modaldemo5").modal("show");
}

function confirm_delete_target() {
  var page = $("#page").val();
  id = $("#hid").val();
  console.log(id);
  $.ajax({
    url: "/superadmin/assign-target-view",
    type: "GET",
    data: { page: page, delete: "1", item_id: id },
    success: function (data) {
      $("#modaldemo5").modal("hide");
      $("#target-table").html(data.template);
    },
  });
}

//-------Daily report

$(document).on("click", "#dreports_search", function () {
  console.log("Daily report");
  dreports_view("None");
});

function keySearchReport() {
  dreports_view("None");
}

function dreports_view(data) {
  console.log(data);
  var page = "1";
  if (data != "None") {
    var page = data;
  }
  console.log("page", page);
  var start = $("#start").val();
  var end = $("#end").val();
  var position = $("#position").val();
  var employee = $("#employee").val();
  var project = $("#projId").val();
  var department = $("#department").val();
  var search = $("#keySearch").val();

  console.log(start, end, employee, project, department);
  $.ajax({
    url: "/superadmin/daily-report-view",
    type: "GET",
    data: {
      start: start,
      end: end,
      position: position,
      employee: employee,
      project: project,
      department: department,
      search: search,
      page: page,
    },
    success: function (data) {
      $("#dreports-table").html(data.template);
    },
  });
}

//-----renewals

$(document).on("click", "#renewal_search", function () {
  console.log("renewal");
  renewals_view("None");
});

function searchRenewal() {
  renewals_view("None");
}

function renewals_view(data) {
  console.log(data);
  var page = "1";
  if (data != "None") {
    var page = data;
  }
  console.log("page", page);
  var start = $("#start").val();
  var end = $("#end").val();
  var renewal = $("#renewal").val();
  var search = $("#search").val();

  console.log(start, end, renewal);
  $.ajax({
    url: "/superadmin/renewals-view",
    type: "GET",
    data: {
      start: start,
      end: end,
      renewal: renewal,
      search: search,
      page: page,
    },
    success: function (data) {
      $("#renewal-table").html(data.template);
    },
  });
}

function show_renewals_modal(id) {
  $("#hid").val(id);
  $("#renewalDelete").modal("show");
}

function confirm_delete_renewal() {
  var page = $("#page").val();
  id = $("#hid").val();
  console.log(id);
  $.ajax({
    url: "/superadmin/renewals-view",
    type: "GET",
    data: { page: page, delete: "1", item_id: id },
    success: function (data) {
      $("#renewalDelete").modal("hide");
      $("#renewal-table").html(data.template);
    },
  });
}

//-----Job application

$(document).on("click", "#applicant_search", function () {
  applicant_view("None");
});

function searchApplicant() {
  applicant_view("None");
}

function applicant_view(data) {
  var page = "1";
  if (data != "None") {
    var page = data;
  }
  var start = $("#start").val();
  var end = $("#end").val();
  var status = $("#status").val();
  var title = $("#title").val();
  var join = $("#join").val();
  var qualification = $("#qualification").val();
  var experience = $("#experience ").val();
  var search = $("#search").val();
  var itbackground = $("#it_background").val();
  var days = $("#days").val();
  var socialMode = $("#social_mode").val();

  // console.log(start,end,renewal);
  $.ajax({
    url: "/superadmin/job-applicant-view",
    type: "GET",
    data: {
      start: start,
      end: end,
      status: status,
      title: title,
      join: join,
      qualification: qualification,
      experience: experience,
      search: search,
      page: page,
      itbackground: itbackground,
      days: days,
      social_mode: socialMode,
    },
    success: function (data) {
      const queryString = new URLSearchParams(data.params).toString();
      window.history.replaceState(null, "", `?${queryString}`);
      $("#applicant-table").html(data.template);
    },
  });
}

$(document).on("click", "#applicant_reset", function () {
  window.history.replaceState(null, "", window.location.pathname);
    location.reload();
})
//-----Job application status changing in detailpage

$(document).on("change", ".jobStatusAction", function () {

  var id = $(this).attr('data-id')
  var statusdata = $(this).val()
  console.log("##### statusdata #####",statusdata)

  $.ajax({
    url: "/superadmin/change-job-status",
    type: "GET",
    data: {
      status: statusdata,
      id: id,
    },
    success: function (data) {
      // $(`#status_date${data.id}`).html(data.date)
      $("#statusMessage").show();
      // Hide the message after 3 seconds
      setTimeout(function () {
        $("#statusMessage").hide();
      }, 2000);
    },
  });
})

//----openings

function createOpening() {
  var button = $("#submitButton1");
  button.prop("disabled", true);
  var form = $("#openingsform1");
  var title = $("#title").val();
  var sendEmailChecked = $("#SendEmail").is(":checked");
  var sendSMSChecked = $("#SendSMS").is(":checked");

  var sendEmailValue = sendEmailChecked ? $("#SendEmail").val() : false;
  var sendSMSValue = sendSMSChecked ? $("#SendSMS").val() : false;
  $.ajax({
    url: "/superadmin/openings-add",
    type: "GET",
    data: {
      title: title,
      sendEmail: sendEmailValue,
      sendSMS: sendSMSValue,
    },
    success: function (data) {
      if (data.status) {
        $("#createOpening").modal("hide");
        form[0].reset();
        button.prop("disabled", false);
        $("#title").prop("selectedIndex", 0);
        $("#openigs_msg").text(data.message).show().fadeOut(3000);
        $("#openingss").html(data.template);
      }
    },
  });
}

function deleteOpening(id) {
  $("#deletePop").modal("show");
  $("#deleteId").val(id);
}

function confirm_delete_opening() {
  var id = $("#deleteId").val();
  $.ajax({
    url: "/superadmin/opening-delete",
    type: "GET",
    data: {
      id: id,
    },
    success: function (data) {
      if (data.status) {
        $("#openingss").empty();
        $("#deletePop").modal("hide");
        // console.log(data.template);
        $("#openigs_msg").text(data.message).show().fadeOut(3000);
        $("#openingss").html(data.template);
      }
    },
  });
}

//---openings tab switching
function getOpeningApplications(form_type, slug) {
  $.ajax({
    url: "/superadmin/get-applications",
    type: "GET",
    data: {
      form_type: form_type,
      slug: slug,
    },
    success: function (data) {
      if (data.status) {
        $("#resumes").html(data.template);
      }
    },
  });
}

$(document).on("click", "#resume_search", function () {
  resume_view("None");
});

function searchApplication() {
  resume_view("None");
}

function resume_view(data) {
  var page = "1";
  if (data != "None") {
    var page = data;
  }
  var activeTab = $(".openingTab .nav-link.active");
  var form_type = activeTab.attr("data-type");
  var exp = $("#exp").val();
  var start = $("#start").val();
  var end = $("#end").val();
  var qualification = $("#qualification").val();
  var join = $("#join").val();
  var status = $("#status").val();
  var search = $("#search").val();

  $.ajax({
    url: "/superadmin/application-view",
    type: "GET",
    data: {
      page: page,
      form_type: form_type,
      exp: exp,
      start: start,
      end: end,
      qualification: qualification,
      join: join,
      status: status,
      search: search,
    },
    success: function (data) {
      $("#application-table").html(data.template);
    },
  });
}

// submit button restriction
var myForm = document.getElementById("myform");
if (myForm) {
document.getElementById("myform").addEventListener("submit", function (event) {
  // Disable the submit button when the form is submitted
  document.getElementById("submitButton").disabled = true;

  setTimeout(function () {
    document.getElementById("submitButton").disabled = false;
  }, 3000);
});

}
function bulkSMMAssign() {
  var executive = $("#bulk_exec").val();
  var checkedValues = [];
  $("input.form-check-input.cbox:checked").each(function () {
    checkedValues.push($(this).val());
  });
  console.log(checkedValues, "checkedValues");
  console.log(executive, "executive");
  var button = $("#bulk_assign");
  button.html(
    '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span><span>Assigning...</span>'
  );
  $.ajax({
    url: "/superadmin/bulk-assign-smm-client",
    type: "GET",
    data: {
      checkedValues: JSON.stringify(checkedValues),
      executive: executive,
    },
    success: function (data) {
      if (data.status) {
        console.log("success");
        window.location.reload();
        $("#bulkSuccess").modal("show");
      } else {
        console.log("failed");
        window.location.reload();
        $("#bulkSuccess").modal("show");
      }
    },
  });
}
function bulkGoogleAssign() {
  var executive = $("#bulk_exec").val();
  var checkedValues = [];
  $("input.form-check-input.cbox:checked").each(function () {
    checkedValues.push($(this).val());
  });
  console.log(checkedValues, "checkedValues");
  console.log(executive, "executive");
  var button = $("#bulk_assign");
  button.html(
    '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span><span>Assigning...</span>'
  );
  $.ajax({
    url: "/superadmin/bulk-assign-google-client",
    type: "GET",
    data: {
      checkedValues: JSON.stringify(checkedValues),
      executive: executive,
    },
    success: function (data) {
      if (data.status) {
        console.log("success");
        window.location.reload();
        $("#bulkSuccess").modal("show");
      } else {
        console.log("failed");
        window.location.reload();
        $("#bulkSuccess").modal("show");
      }
    },
  });
}
$(document).on("change", ".change_user_status", function () {
  var data_id = $(this).attr("data-id");
  var status = $(this).val();
  var isChecked = $(this).prop("checked");
  console.log("Data ID:", data_id);
  console.log("status:", isChecked);
  $.ajax({
    url: "/superadmin/user_status_change",
    type: "GET",
    data: {
      data_id: data_id,
      isChecked:isChecked
    },
    success: function (data) {
      if (data.status) {
        console.log("@@@@@@@@@Done@@@@@@")
      }
    },
  });
});


$(document).on("change", "#interview_date", function () {

  var interview_date = $(this).val();
  var user_id = $(this).attr('data-id');
 
  $.ajax({
    url: "/superadmin/add_interview_date/",
    type: "GET",
    data: {
      user_id:user_id,
      interview_date: interview_date,
      
    },
    success: function (data) {
      if (data.status) {
        console.log("@@@@@@@@@Done@@@@@@")
        $("#interview_date").css("background-color", "lightgreen");
        setTimeout(() => {
          $("#interview_date").css("background-color", "white"); // Green when a date is selected
      
       }, 2000);
      }
    },
  });
});

$(document).on('change', '.statusChangeLeave', function() {
 
  var status = ''
  var data_id = $(this).attr("data-id")
  var date = $(this).attr("data-date")
  var url = $('#url').val()
    if($(this).prop('checked') == true){
      //do something
      status=1
    }
    else{
        status=2
    }
    $.ajax({
          url: "/superadmin/repoert_status_change_leave/",
          type: 'GET',
          data: {status:status,data_id:data_id,date:date},
          
          success: function(data) {
           console.log("==== Done ====")
           
          }            
      });
  
  });

  

  $(document).on('click', '.job_response', function() {
 
    var data_id = $(this).attr("data-id")
    $("#resume_response").val(data_id)
    });


    
  $(document).on('click', '#random_assignee_button', function() {
    let selectedValues = []; 
    var assignee = $("#random_assignee").val()
    console.log(`the value is ${assignee}`)
    $.ajax({
      url: "/superadmin/random_assignee/",
      type: 'GET',
      data: {assignee:JSON.stringify(assignee)},
      
      success: function(data) {
        $("#random_assignee_success").html('Updated successfully')
        $("#random_assignee_success").css('color','green')
        setTimeout(() => {
          $("#random_assignee_success").html('')
        }, "2000");
        
      }            
  });
    });

    
    $(document).on('click', '#random_assignee_google_button', function() {
      let selectedValues = []; 
      var assignee = $("#random_assignee").val()
      console.log(`the value is ${assignee}`)
      $.ajax({
        url: "/superadmin/random_google_assignee/",
        type: 'GET',
        data: {assignee:JSON.stringify(assignee)},
        
        success: function(data) {
          $("#random_assignee_success").html('Updated successfully')
          $("#random_assignee_success").css('color','green')
          setTimeout(() => {
            $("#random_assignee_success").html('')
          }, "2000");
          
        }            
        });
    });
      




// check lead already exists

var phonedebounceTimer;

// Function to handle input event
function handlePhoneInput() {
    clearTimeout(phonedebounceTimer);

    let phoneNumber = $('#lead_phone_number').val().trim();

    if (phoneNumber) {
        // Start debounce after 1 second (1000ms)
        phonedebounceTimer = setTimeout(() => {
            checkPhoneNumber(phoneNumber);
        }, 1500);
    } else {
        $('#phone_status').text('');
    }
}

// Function to make the AJAX request
function checkPhoneNumber(phoneNumber) {

    $.ajax({
        method: "GET",
        url: '/sales/check-lead-exists', 
        data: {
            phone_number: phoneNumber,
        },
        success: function (response) {
            console.log(response.exists);
            
            if (response.exists) {

                $('#phone_status').text(`Phone number already exists!- Created at: ${response.created_at}`).addClass('text-danger');
            }
            else {
                $('#phone_status').text('').removeClass('text-danger text-success');
            }
        },
        error: function () {
            $('#phone_status').text('Failed to check phone number').addClass('text-danger');
        }
    });
}


function handleDealerPhoneInput() {
    clearTimeout(phonedebounceTimer);

    let phoneNumber = $('#lead_phone_number').val().trim();

    if (phoneNumber) {
        // Start debounce after 1 second (1000ms)
        phonedebounceTimer = setTimeout(() => {
            checkDealerPhoneNumber(phoneNumber);
        }, 1000);
    } else {
        $('#phone_status').text('');
    }
}

// Function to make the AJAX request
function checkDealerPhoneNumber(phoneNumber) {

    $.ajax({
        method: "GET",
        url: '/marketing/check-dealer-exists', 
        data: {
            phone_number: phoneNumber,
        },
        success: function (response) {
            console.log(response.exists);
            
            if (response.exists) {

                $('#phone_status').text(`Phone number already exists!- Created at: ${response.created_at}`).addClass('text-danger');
            }
            else {
                $('#phone_status').text('').removeClass('text-danger text-success');
            }
        },
        error: function () {
            $('#phone_status').text('Failed to check phone number').addClass('text-danger');
        }
    });
}



// ---- scrpit fro excel upload screen design ----
document.addEventListener('DOMContentLoaded', function() {
  const uploadZone = document.getElementById('uploadZone');
  const fileInput = document.getElementById('fileInput');
  const fileDisplay = document.getElementById('fileDisplay');
  const fileName = document.getElementById('fileName');
  const removeFile = document.getElementById('removeFile');
  const submitBtn = document.getElementById('submitBtn');
  const uploadProgress = document.getElementById('uploadProgress');
  const uploadProgressBar = document.getElementById('uploadProgressBar');
  const uploadForm = document.getElementById('uploadForm');

  // File selection handling
  uploadZone.addEventListener('click', function(e) {
    if (!e.target.closest('#removeFile') && !e.target.closest('.file-display')) {
      fileInput.click();
    }
  });

  fileInput.addEventListener('change', function() {
    if (this.files.length > 0) {
      const file = this.files[0];
      if (!file.name.endsWith('.xlsx')) {
        alert('Please select a valid .xlsx file');
        resetFile();
        return;
      }
      fileName.textContent = file.name;
      fileDisplay.classList.add('show');
      submitBtn.disabled = false;
    }
  });

  removeFile.addEventListener('click', function(e) {
    e.stopPropagation();
    resetFile();
  });

  function resetFile() {
    fileInput.value = '';
    // Reset input to allow re-selecting the same file again
    const newInput = fileInput.cloneNode(true);
    fileInput.parentNode.replaceChild(newInput, fileInput);
    fileInput = newInput;
    fileDisplay.classList.remove('show');
    submitBtn.disabled = true;

    // Re-bind the change listener
    fileInput.addEventListener('change', function() {
      if (this.files.length > 0) {
        const file = this.files[0];
        if (!file.name.endsWith('.xlsx')) {
          alert('Please select a valid .xlsx file');
          resetFile();
          return;
        }
        fileName.textContent = file.name;
        fileDisplay.classList.add('show');
        submitBtn.disabled = false;
      }
    });
  }

  // Drag and drop functionality
  uploadZone.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.classList.add('drag-over');
  });

  uploadZone.addEventListener('dragleave', function() {
    this.classList.remove('drag-over');
  });

  uploadZone.addEventListener('drop', function(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].name.endsWith('.xlsx')) {
      fileInput.files = files;
      fileName.textContent = files[0].name;
      fileDisplay.classList.add('show');
      submitBtn.disabled = false;
    } else {
      alert('Only .xlsx files are supported');
      resetFile();
    }
  });

  // Form submission with progress simulation
  uploadForm.addEventListener('submit', function(e) {
    // Show progress bar
    uploadProgress.style.display = 'block';
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 90) {
        progress = 90;
        clearInterval(interval);
      }
      uploadProgressBar.style.width = progress + '%';
    }, 200);
    
    // Reset progress bar after form submission
    setTimeout(() => {
      uploadProgress.style.display = 'none';
      uploadProgressBar.style.width = '0%';
    }, 3000);
  });
});
// ---------------------------------------