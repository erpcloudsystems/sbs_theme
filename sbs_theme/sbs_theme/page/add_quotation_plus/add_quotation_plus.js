frappe.pages["add-quotation-plus"].on_page_load = function (wrapper) {
  var page = frappe.ui.make_app_page({
    parent: wrapper,
    title: "",
    single_column: true,
  });

  const $wrapper = $(wrapper);
  const NS = ".addQuotationPlus";
  if ($wrapper.data("aqp-initialized")) return;
  $wrapper.data("aqp-initialized", true);

  let collected = {};
  let add_ons = [];
  let package_rules = {};
  let addonsLoaded = false;
  // === Floor Area Pricing Rules ===
  const FLOOR_UNIT_SIZE = 100; // sqm per unit
  const FLOOR_UNIT_RATE = 2590; // price per unit

  // init css styling
  $wrapper.find(".page-head").hide();
  const pc = $wrapper.closest(".page-container").get(0);
  if (pc) pc.style.setProperty("background-color", "#f5f5dc", "important");

  // 🔹 Inject Google Fonts
  if (!document.getElementById("aqp-google-fonts")) {
    let gf = document.createElement("link");
    gf.id = "aqp-google-fonts";
    gf.rel = "stylesheet";
    gf.href =
      "https://fonts.googleapis.com/css2?family=Anton&family=Courier+Prime:wght@400;700&display=swap";
    document.head.appendChild(gf);
  }

  // 🔹 Inject GLOBAL CSS
  if (!document.getElementById("aqp-global-style")) {
    const style = document.createElement("style");
    style.id = "aqp-global-style";
    style.textContent = `
      main {
        font-family: "Courier Prime", monospace !important;
        background-color: #f5f5dc !important;
        color: #040404 !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        min-height: 100vh !important;
        padding: 16px !important;
      }
      main h1,
      main h2,
      main h3 {
        font-family: "Anton", sans-serif !important;
      }
      main .space-x-2 > * + * {
        margin-left: 4px !important;
      }
      main .space-x-2 {
        margin-left: 8px !important;
      }
      main .space-y-1 > * + * {
        margin-top: 4px !important;
      }
      main .space-y-2 > * + * {
        margin-top: 8px !important;
      }
      main .space-y-4 > * + * {
        margin-top: 16px !important;
      }
      main .space-y-6 > * + * {
        margin-top: 24px !important;
      }
      main .checkbox-custom {
        accent-color: #040404 !important;
      }
      main .select-custom {
        background-color: #f5f5dc !important;
        color: #040404 !important;
        border-color: #040404 !important;
      }
      main .disabled-input {
        background-color: #e5e5d5 !important;
        cursor: not-allowed !important;
      }

      main > header {
        width: 100% !important;
        max-width: 672px !important;
        text-align: center !important;
        margin-bottom: 14px !important;
      }

      main > header > div {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 16px !important;
      }

      main > section {
        background-color: #e5e5d5 !important;
        padding: 64px !important;
        box-shadow: 0 0 #0000, 0 0 #0000, 0 20px 25px -5px rgb(0 0 0 / 0.1),
          0 8px 10px -6px rgb(0 0 0 / 0.1) !important;
        border-radius: 20px !important;
        max-width: 672px !important;
        width: 100% !important;
      }

      main > section > h1 {
        font-size: 32px !important;
        font-weight: bold !important;
        text-align: center !important;
        color: #040404 !important;
        margin-bottom: 8px !important;
      }

      main > section > p {
        text-align: center !important;
        color: gray !important;
        margin-bottom: 72px !important;
      }

      main #cost-form label.aspect {
        font-size: 18px !important;
        font-weight: 500 !important;
        color: #040404 !important;
      }

      main #cost-form select,
      main #cost-form #area-select {
        width: 100% !important;
        padding: 12px !important;
        border: 1px solid #040404 !important;
        border-radius: 12px !important;
        transition: all 0.1s ease-in-out !important;
        cursor: pointer !important;
      }

      main #cost-form select:focus,
      main .package_details > div > div input:focus,
      main .package_details > div > div input:focus,
      main .package_details > div > div input:focus {
        outline: none !important;
        border: 1px solid #040404 !important;
      }

      main #cost-form .warning-msg {
        font-weight: 600 !important;
        font-size: 14px !important;
        text-align: center !important;
        color: red !important;
        margin-top: 10px !important;
      }

      main #cost-form #the-aspirant-package-details,
      main #cost-form #the-validator-package-details,
      main #cost-form #the-visionary-package-details {
        margin-top: 24px !important;
        border: 1px solid #040404 !important;
        background: #f5f5dc !important;
        border-radius: 12px !important;
        padding: 16px !important;
      }

      main #cost-form #the-aspirant-package-details h3,
      main #cost-form #the-validator-package-details h3,
      main #cost-form #the-visionary-package-details h3 {
        font-size: 20px !important;
        font-weight: normal !important;
        color: #040404 !important;
      }

      main #cost-form #the-aspirant-package-details h3 span,
      main #cost-form #the-validator-package-details h3 span,
      main #cost-form #the-visionary-package-details h3 span {
        font-size: 14px !important;
        color: gray !important;
      }

      main #cost-form #the-aspirant-package-details .package_details > label,
      main #cost-form #the-validator-package-details .package_details > label,
      main #cost-form #the-visionary-package-details .package_details > label {
        font-size: 18px !important;
        font-weight: 500 !important;
        color: #040404 !important;
      }

      main #cost-form #the-aspirant-package-details .package_details > div > div,
      main #cost-form #the-validator-package-details .package_details > div > div,
      main #cost-form #the-visionary-package-details .package_details > div > div {
        display: flex !important;
        align-items: center !important;
      }

      main #additional-features-container > div > div > div input[type="checkbox"],
      main .package_details > div > div input[type="checkbox"],
      main .package_details > div > div input[type="checkbox"],
      main .package_details > div > div input[type="checkbox"] {
        height: 20px !important;
        width: 20px !important;
        border-radius: 8px !important;
        border: 1px solid #040404 !important;
      }

      main #additional-features-container > div > div > div label,
      main .package_details > div > div label,
      main .package_details > div > div label,
      main .package_details > div > div label {
        margin-right: 8px !important;
        color: #040404 !important;
      }

      main #additional-features-container > div > div > div input[type="number"],
      main .package_details > div > div input[type="number"],
      main .package_details > div > div input[type="number"],
      main .package_details > div > div input[type="number"] {
        width: 64px !important;
        height: 35px !important;
        padding: 4px !important;
        border: 1px solid #040404 !important;
        border-radius: 8px !important;
        text-align: center !important;
        background: #e5e5d5 !important;
        color: #040404 !important;
      }

      main #additional-features-container > div {
        margin-top: 24px !important;
        padding: 16px !important;
        border: 1px solid #040404 !important;
        border-radius: 12px !important;
        background: #e5e5d5 !important;
      }

      main #additional-features-container > div > h3 {
        font-size: 20px !important;
        font-weight: normal !important;
        color: #040404 !important;
      }

      main #additional-features-container > div > div > div {
        display: flex !important;
        align-items: center !important;
      }

      main #selected-items-summary,
      main .total_price {
        margin-top: 32px !important;
        padding-top: 16px !important;
        border-top: 3px solid #040404 !important;
      }

      main #selected-items-summary .order_details {
        font-size: 20px !important;
        font-weight: bold !important;
        color: #040404 !important;
        margin-bottom: 16px !important;
      }

      main .total_price > div {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        font-size: 20px !important;
        font-weight: bold !important;
        color: #040404 !important;
      }
      main #selected-items-summary table {
        width: 100% !important;
        border-collapse: collapse !important;
        font-size: 14px !important;
      }
      main #selected-items-summary th,
      main #selected-items-summary td {
        border: 1px solid #040404 !important;
        padding: 8px !important;
      }
      main #selected-items-summary th {
        text-align: left !important;
        font-weight: 700 !important;
        background: #e5e5d5 !important;
      }
      main #selected-items-summary tr:nth-child(even) td {
        background: #f0f0df !important;
      }
      main #selected-items-summary .group-row td {
        background: #e0dfcf !important;
        font-weight: 700 !important;
      }
      main #selected-items-summary .meta {
        margin-bottom: 12px !important;
        color: #333 !important;
        font-size: 13px !important;
      }

      /* md */
      @media (min-width: 768px) {
        main > section {
          padding: 48px !important;
        }
      }

    `;
    document.head.appendChild(style);
  }

  const CONTENT = `
<main id="aqp-root">
  <!-- Header with Logo -->
  <header>
    <div>
      <img
        src="/assets/sbs_theme/images/butler_logo-isolated.png"
        alt="Butler Logo"
        width="64px"
        height="64px"
      />
    </div>
  </header>
  <!-- Main Container -->
  <section>
    <h1>Building Cost Calculator</h1>
    <p>
      Select the components of your building and its facilities to get an
      estimated cost.
    </p>
    <!-- Form for selections -->
    <div id="cost-form" class="space-y-6">
      <!-- Building Type -->
      <div class="space-y-2">
        <label for="building-type" class="aspect">Building Type</label>
        <select id="building-type" class="select-custom" name="building_type">
        <option selected value="0" disabled>select building type</option>
        </select>
      </div>
      <!-- Floor Area Selection -->
      <div class="space-y-2">
        <label for="area-select" class="aspect">Floor Area</label>
        <input
          name="floor_area"
          type="number"
          id="area-select"
          class="select-custom"
          placeholder="write area between 50sqm to 5000sqm"
        />
      </div>
      <!-- Number of Floors -->
      <div class="space-y-2">
        <label for="materials" class="aspect">Number of Floors</label>
        <select name="no_floors" id="materials" class="select-custom">
          <option value="21990" data-val="1"  selected>1</option>
          <option value="43980" data-val="2" >2</option>
          <option value="65970" data-val="3" >3</option>
          <option value="87960" data-val="4" >4</option>
        </select>
      </div>
      <!-- Package Selection -->
      <div class="space-y-2">
        <label for="features" class="aspect">Select Package</label>
        <select name="custom_package_type" id="features" class="select-custom">
          <option
            value="0"
            data-rooms-max="0"
            data-services-max="0"
            disabled
            selected
          >
            Select a Package
          </option>
          <option
            value="The Aspirant"
            data-rooms-max="3"
            data-services-max="6"
            data-price="4000"
          >
            The Aspirant
          </option>
          <option
            value="The Validator"
            data-rooms-max="7"
            data-services-max="12"
            data-price="8000"
          >
            The Validator
          </option>
          <option
            value="The Visionary"
            data-rooms-max="12"
            data-services-max="24"
            data-price="12000"
          >
            The Visionary
          </option>
        </select>
      </div>
      <!-- The Aspirant Package Details (Dynamically shown) -->
      <div id="the-aspirant-package-details" class="hidden space-y-4"></div>
      <!-- The Validator Package Details (Dynamically shown) -->
      <div id="the-validator-package-details" class="hidden space-y-4"></div>
      <!-- The Visionary Package Details (Dynamically shown) -->
      <div id="the-visionary-package-details" class="hidden space-y-4"></div>
      <!-- Additional Features Question -->
      <div class="space-y-2">
        <label for="additional-features-select"
          >Are there any add-ons to the package?
        </label>
        <select
          id="additional-features-select"
          class="select-custom"
          name="add_ons"
        >
          <option value="no">NO</option>
          <option value="yes">YES</option>
        </select>
      </div>
      <!-- Additional Features Container (hidden by default) -->
      <div id="additional-features-container" class="space-y-6 hidden"></div>
      <!-- Selected Items Summary -->
      <div id="selected-items-summary" class="hidden">
        <h3 class="order_details">تفاصيل الطلب:</h3>
        <div id="summary-content" class="space-y-2"></div>
      </div>
      <!-- Total Price Section -->
      <div class="total_price">
        <div><span>الإجمالي:</span> <span id="total-price">0</span></div>
      </div>
    </div>

    <button class="submit_form btn btn-primary w-100 mt-5 fw-bold fs-4 py-3 ">انشاء عرض سعر</button>
  </section>
</main>
`;

  $(page.body).append(CONTENT);

  // ✅ util: empty containers
  function ensure_addons_container_cleared() {
    const $adds = $("#additional-features-container");
    $adds.empty();
    addonsLoaded = false;
  }

  // ✅ helpers
  function number(val, d = 2) {
    const n = Number(val || 0);
    return Number.isFinite(n) ? n : 0;
  }

  function fmt(val) {
    const n = number(val);
    return n.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function esc(s) {
    return frappe.utils.escape_html(String(s ?? ""));
  }

  function update_package_rules() {
    const $sel = $("#features");
    const $opt = $sel.find("option:selected");

    const roomsMax = number($opt.attr("data-rooms-max"));
    const servicesMax = number($opt.attr("data-services-max"));
    const basePrice = number($opt.attr("data-price"));

    package_rules = {
      package: $sel.val() || null,
      rooms_max: Number.isFinite(roomsMax) ? roomsMax : 0,
      services_max: Number.isFinite(servicesMax) ? servicesMax : 0,
      base_price: Number.isFinite(basePrice) ? basePrice : 0,
    };
  }

  function reset_package_selections() {
    const $pkg = $(
      "#the-aspirant-package-details, #the-validator-package-details, #the-visionary-package-details"
    );

    $pkg.find('input.package-option[type="checkbox"]').prop("checked", false);
    $pkg.find("input.quantity-input").val(0);

    add_ons = add_ons.filter((x) => x.origin !== "package");
    render_summary();
  }

  function get_floor_area_value() {
    return number($("#area-select").val());
  }

  function get_floor_area_units() {
    const area = get_floor_area_value();
    if (area <= 0) return 0;
    return Math.ceil(area / FLOOR_UNIT_SIZE);
  }

  function calc_floor_area_price() {
    return get_floor_area_units() * FLOOR_UNIT_RATE;
  }

  function get_building_price() {
    const $sel = $("#building-type");
    const $opt = $sel.find("option:selected");
    return number($opt.attr("data-price"));
  }

  function get_no_floors_value() {
    return number($("#materials").val());
  }

  // ✅ extract the selected items
  function get_current_items() {
    return add_ons.filter((x) => number(x.qty) >= 1);
  }

  function price_with_package_rules(items) {
    const rows = (items || []).map((it) => ({
      item_code: it.item_code,
      item_group: it.item_group || "Package",
      type: (it.type || "other").toLowerCase(),
      qty: number(it.qty || 0),
      rate: number(it.rate || 0),
    }));

    let remaining_rooms = number(package_rules.rooms_max || 0);
    let remaining_services = number(package_rules.services_max || 0);

    const priced = rows.map((row) => {
      let included = 0;
      let extra = row.qty;

      if (row.type === "room" && remaining_rooms > 0) {
        included = Math.min(row.qty, remaining_rooms);
        extra = Math.max(0, row.qty - included);
        remaining_rooms -= included;
      } else if (row.type === "service" && remaining_services > 0) {
        included = Math.min(row.qty, remaining_services);
        extra = Math.max(0, row.qty - included);
        remaining_services -= included;
      } else {
        included = 0;
        extra = row.qty;
      }

      const amount = number(extra) * number(row.rate);

      return {
        ...row,
        included_qty: included,
        extra_qty: extra,
        amount,
      };
    });

    const totals = {
      rooms_included_limit: number(package_rules.rooms_max || 0),
      services_included_limit: number(package_rules.services_max || 0),
      rooms_included_used: totals_sum(
        priced.filter((r) => r.type === "room").map((r) => r.included_qty)
      ),
      services_included_used: totals_sum(
        priced.filter((r) => r.type === "service").map((r) => r.included_qty)
      ),
      grand_total: totals_sum(priced.map((r) => r.amount)),
    };

    return { priced, totals };

    function totals_sum(arr) {
      return arr.reduce((a, b) => a + number(b), 0);
    }
  }

  function update_lock_state() {
    const roomsLimit = number(package_rules.rooms_max || 0);
    const servicesLimit = number(package_rules.services_max || 0);

    // ✅ الاستخدام محسوب من (package + addon) معًا
    const roomsUsed = add_ons
      .filter((x) => (x.type || "").toLowerCase() === "room")
      .reduce((a, b) => a + number(b.qty || 0), 0);

    const servicesUsed = add_ons
      .filter((x) => (x.type || "").toLowerCase() === "service")
      .reduce((a, b) => a + number(b.qty || 0), 0);

    const roomsRemaining = Math.max(0, roomsLimit - roomsUsed);
    const servicesRemaining = Math.max(0, servicesLimit - servicesUsed);

    // 👇 نقفل عناصر الباكدج فقط لما المتبقي = 0، الإضافات تظل شغالة
    const $pkg = $(
      "#the-aspirant-package-details, #the-validator-package-details, #the-visionary-package-details"
    );

    // Rooms in package
    $pkg.find('input.package-option[data-type="room"]').each(function () {
      const $cb = $(this);
      const $num = $cb.closest(".space-x-2").find("input.quantity-input");
      if ($cb.is(":checked")) {
        $cb.prop("disabled", false);
        $num.prop("disabled", false);
      } else {
        const lock = roomsRemaining <= 0;
        $cb.prop("disabled", lock);
        $num.prop("disabled", lock);
      }
    });

    // Services in package
    $pkg.find('input.package-option[data-type="service"]').each(function () {
      const $cb = $(this);
      const $num = $cb.closest(".space-x-2").find("input.quantity-input");
      if ($cb.is(":checked")) {
        $cb.prop("disabled", false);
        $num.prop("disabled", false);
      } else {
        const lock = servicesRemaining <= 0;
        $cb.prop("disabled", lock);
        $num.prop("disabled", lock);
      }
    });
  }

  // build summery table
  function render_summary() {
    const $summaryBox = $("#selected-items-summary");
    const $summary = $("#summary-content");

    const meta = {
      Building: collected["building_type"] || $("#building-type").val(),
      "Floor Area": $("#area-select").val(),
      "No. Floors": collected["no_floors"] || $("#materials").data("val"),
      Package: collected["custom_package_type"] || $("#features").val(),
      "Add-ons?":
        $("#additional-features-select").val() === "yes" ? "Yes" : "No",
    };

    const items = get_current_items();
    if (!items.length) {
      $summary.empty();
      $summaryBox.addClass("hidden");
      const base = number(package_rules.base_price || 0);
      const floorPrice = calc_floor_area_price();
      const buildingPrice = get_building_price();
      const floorsValue = get_no_floors_value();
      $("#total-price").text(
        fmt(base + floorPrice + buildingPrice + floorsValue)
      );
      return;
    }

    // ✅ accept rules
    const { priced, totals } = price_with_package_rules(items);

    const groups = {};
    priced.forEach((r) => {
      const g = r.item_group || "Package";
      if (!groups[g]) groups[g] = [];
      groups[g].push(r);
    });

    // meta block
    let metaHtml = `<div class="meta">`;
    Object.keys(meta).forEach((k) => {
      if (meta[k] && meta[k] !== "0") {
        metaHtml += `<div><strong>${esc(k)}:</strong> ${esc(meta[k])}</div>`;
      }
    });

    metaHtml += `<div><strong>Included (Rooms):</strong> ${fmt(
      totals.rooms_included_used
    )} / ${fmt(totals.rooms_included_limit)}</div>`;
    metaHtml += `<div><strong>Included (Services):</strong> ${fmt(
      totals.services_included_used
    )} / ${fmt(totals.services_included_limit)}</div>`;
    metaHtml += `</div>`;

    // table
    let tableHtml = `<table>
    <thead>
      <tr>
        <th style="width:28%">Item</th>
        <th style="width:8%">Type</th>
        <th style="width:8%">Qty</th>
        <th style="width:10%">Included</th>
        <th style="width:10%">Extra</th>
        <th style="width:10%">Rate</th>
      </tr>
    </thead>
    <tbody>`;

    Object.keys(groups).forEach((g) => {
      tableHtml += `<tr class="group-row"><td colspan="8">${esc(g)}</td></tr>`;
      groups[g].forEach((row) => {
        tableHtml += `<tr>
        <td>${esc(row.item_code)}</td>
        <td>${esc(row.type)}</td>
        <td>${fmt(row.qty)}</td>
        <td>${fmt(row.included_qty)}</td>
        <td>${fmt(row.extra_qty)}</td>
        <td>${fmt(row.rate)}</td>
      </tr>`;
      });
    });

    tableHtml += `</tbody></table>`;

    $summary.html(metaHtml + tableHtml);
    $summaryBox.removeClass("hidden");

    const base = number(package_rules.base_price || 0);
    const floorPrice = calc_floor_area_price();
    const buildingPrice = get_building_price();
    const floorsValue = get_no_floors_value();
    $("#total-price").text(
      fmt(base + floorPrice + buildingPrice + floorsValue + totals.grand_total)
    );
  }

  // fetch additional items with item group
  function get_items_with_item_group(item_group, type = "adds", package_name) {
    frappe.call({
      method:
        "sbs_theme.sbs_theme.page.add_quotation_plus.add_quotation_plus.get_items",
      args: { item_group },
      callback: function (r) {
        if (!r.message) return;
        const items = r.message || [];
        if (type == "adds") {
          const $adds_features = $("#additional-features-container");

          const $group_container = $(`
            <div class="space-y-4">
              <h3>${frappe.utils.escape_html(item_group)}</h3>
              <div class="space-y-2"></div>
            </div>
          `);

          const $inputs_container = $group_container.find(".space-y-2");

          items.forEach((item, idx) => {
            const code = (item.item_code || "").toString();
            const name = frappe.utils.escape_html(item.item_name || code);
            const rate = Number(item.rate || 0);
            $inputs_container.append(`
              <div class="space-x-2">
                <input type="checkbox"
                       name="${item_group + "_" + code.split(" ").join("_")}"
                       id="addon-${code.split(" ").join("_")}"
                       data-type='${
                         item_group == "Efficient"
                           ? "service"
                           : item_group == "Security"
                           ? "other"
                           : "room"
                       }'
                       data-price="${rate}"
                       class="additional-option checkbox-custom">
                <label for="addon-${code.split(" ").join("_")}">${name}</label>
                <input type="number" min="0" value="0" class="additional-quantity-input">
              </div>
            `);
          });

          $adds_features.append($group_container);
        } else if (type == "package") {
          const $aspirant_package = $("#the-aspirant-package-details");
          const $validator_package = $("#the-validator-package-details");
          const $visionary_package = $("#the-visionary-package-details");

          const packages = {
            Aspirant: $aspirant_package,
            Validator: $validator_package,
            Visionary: $visionary_package,
          };

          const $group_container = $(`
            <div class="space-y-2 package_details">
              <label>${frappe.utils.escape_html(item_group)}</label>
              <div class="space-y-1"></div>
            </div>
          `);

          $(packages[package_name]).append($group_container);

          const $parent = $group_container.find(".space-y-1");

          const normalizedType =
            item_group.toLowerCase() === "rooms"
              ? "room"
              : item_group.toLowerCase() === "services"
              ? "service"
              : "other";

          items
            .filter((item) => item.name.split(" ")[0] === package_name)
            .forEach((item, idx) => {
              const code = (item.item_code || "").toString();
              const name = frappe.utils.escape_html(item.item_name || code);
              const rate = Number(item.rate || 0);
              $parent.append(`
                <div class="space-x-2">
                  <input
                    type="checkbox"
                    id="${code}"
                    data-type="${normalizedType}"
                    data-price="${rate}"
                    class="package-option checkbox-custom"
                  />
                  <label for="aspirant-master-bedroom">${name
                    .split(" ")
                    .slice(1)
                    .join(" ")}</label>
                  <input type="number" min="0" value="0" class="quantity-input" />
                </div>
              `);
            });
        } else {
          const $building_type = $("#building-type");
          items.forEach((item, idx) => {
            const code = (item.item_code || "").toString();
            const name = frappe.utils.escape_html(item.item_name || code);
            const rate = Number(item.rate || 0);
            $building_type.append(`
                <option value="${code}" data-price="${rate}">${name}</option>
              `);
          });
        }
      },
    });
  }

  get_items_with_item_group("building type", "building");

  $wrapper.off("change" + NS).on("change" + NS, ".select-custom", function () {
    let value = $(this).val();
    const $adds_features = $("#additional-features-container");
    const $aspirant_package = $("#the-aspirant-package-details");
    const $validator_package = $("#the-validator-package-details");
    const $visionary_package = $("#the-visionary-package-details");
    const $n_floors = $("#materials");
    const $building_type = $("#building-type").val();

    if ($(this).attr("id") === "features") {
      update_package_rules();
      reset_package_selections();
      update_lock_state();
    }

    if ($building_type === "Apartment")
      $n_floors.find("option").slice(-2).hide();
    else $n_floors.find("option").show();

    if (value === "The Aspirant") {
      $aspirant_package.empty().append(`
        <h3>The Aspirant Package Details <span>(Max Rooms: 3, Max Services: 6)</span></h3>
      `);
      ["rooms", "Services"].forEach((i) =>
        get_items_with_item_group(i, "package", "Aspirant")
      );
      $aspirant_package.removeClass("hidden");
      $visionary_package.addClass("hidden");
      $validator_package.addClass("hidden");
    } else if (value === "The Validator") {
      $validator_package.empty().append(`
        <h3>The Validator Package Details <span>(Max Rooms: 7, Max Services: 12)</span></h3>
      `);
      ["rooms", "Services"].forEach((i) =>
        get_items_with_item_group(i, "package", "Validator")
      );
      $validator_package.removeClass("hidden");
      $aspirant_package.addClass("hidden");
      $visionary_package.addClass("hidden");
    } else if (value === "The Visionary") {
      $visionary_package.empty().append(`
        <h3>The Visionary Package Details <span>(Max Rooms: 12, Max Services: 24)</span></h3>
      `);
      ["rooms", "Services"].forEach((i) =>
        get_items_with_item_group(i, "package", "Visionary")
      );
      $visionary_package.removeClass("hidden");
      $aspirant_package.addClass("hidden");
      $validator_package.addClass("hidden");
    }

    // toggle additional features
    if (value === "yes") {
      $adds_features.removeClass("hidden");
      if (!addonsLoaded) {
        [
          "Hospitality",
          "Efficient",
          "Entertainment",
          "Security",
          "Comfort",
        ].forEach((item) => get_items_with_item_group(item));
        addonsLoaded = true;
      }
    }
    if (value === "no") {
      $adds_features.addClass("hidden");
      add_ons = add_ons.filter((x) => x.origin === "package");

      $adds_features.find("input.additional-option").prop("checked", false);
      $adds_features.find("input.additional-quantity-input").val(0);

      ensure_addons_container_cleared();

      render_summary();
      update_lock_state?.();
    }

    //  collect data from fields
    $wrapper.find(".select-custom").each(function () {
      const name = $(this).attr("name");
      let val = $(this).val();

      if (name === "no_floors") {
        const $opt = $(this).find("option:selected");
        let dv = $opt.data("val");

        if (dv == null || dv === "") {
          let n = parseInt($opt.val(), 10);
          if (!Number.isFinite(n)) {
            const m = String($opt.text() || "").match(/\d+/);
            n = m ? parseInt(m[0], 10) : 0;
          }
          dv = n;
        }

        val = dv;
      }

      if (name) collected[name] = val;
    });

    render_summary();
  });

  // ✅ checkbox change
  $wrapper.on(
    "change" + NS + ".package-checkbox",
    'input[type="checkbox"].package-option, input[type="checkbox"].additional-option',
    function () {
      const $cb = $(this);
      const checked = $cb.is(":checked");

      const rawName = $cb.attr("name") || $cb.attr("id") || "";
      const rateNum = number($cb.attr("data-price"));
      const typ = ($cb.attr("data-type") || "other").trim().toLowerCase(); // room | service | other
      const origin = $cb.hasClass("package-option") ? "package" : "addon";

      let item_code = rawName;
      let item_group = null;

      if (rawName.includes("_")) {
        const [group, code] = rawName.split("_");
        item_group = (group || "Package").trim();
        item_code = (code || rawName).trim();
      } else {
        item_group =
          $cb.closest(".space-y-4").find("> h3").text().trim() || "Package";
      }

      const $qtyInput = $cb.closest(".space-x-2").find('input[type="number"]');
      const idx = add_ons.findIndex((x) => x.item_code === item_code);

      // لو unchecked: صفّر واحذف من add_ons
      if (!checked) {
        $qtyInput.val(0);
        if (idx > -1) add_ons.splice(idx, 1);
        render_summary();
        update_lock_state?.();
        return;
      }

      // لو checked: عيّن كمية ابتدائية
      let nextQty = parseInt($qtyInput.val(), 10);
      if (!Number.isFinite(nextQty) || nextQty < 1) nextQty = 1;

      // 🔒 احترام حدود الباكدج لو العنصر من نوع room/service وجاي من package
      if (origin === "package" && (typ === "room" || typ === "service")) {
        const limit =
          typ === "room"
            ? number(package_rules.rooms_max)
            : number(package_rules.services_max);

        // ✅ الاستخدام من (package + addon) كله
        const usedAll = add_ons
          .filter((x) => x.type === typ)
          .reduce((a, b) => a + number(b.qty || 0), 0);

        let remaining = Math.max(0, limit - usedAll);

        if (remaining <= 0) {
          $cb.prop("checked", false);
          frappe.show_alert({
            message: __("Limit reached for " + typ),
            indicator: "red",
          });
          update_lock_state?.();
          return;
        }

        nextQty = Math.min(nextQty, remaining);
      }

      $qtyInput.val(nextQty);

      const payload = {
        item_code,
        qty: nextQty,
        item_group,
        rate: rateNum,
        type: typ,
        origin,
      };

      if (idx > -1) add_ons[idx] = payload;
      else add_ons.push(payload);

      render_summary();
      update_lock_state?.();
    }
  );

  // ✅ quantity input change
  $wrapper.on(
    "change" + NS + ".qty-input",
    'input[type="number"].quantity-input, input[type="number"].additional-quantity-input',
    function () {
      const $qty = $(this);
      let val = parseInt($qty.val(), 10);
      if (!Number.isFinite(val)) val = 0;

      const $cb = $qty.closest(".space-x-2").find('input[type="checkbox"]');
      const isChecked = $cb.is(":checked");

      // لو الـ checkbox مش متعلّم عليه: اسمح بـ >=0 واطلع
      if (!isChecked) {
        if (val < 0) val = 0;
        $qty.val(val);
        return;
      }

      // تحديد هوية العنصر
      const rawName = $cb.attr("name") || $cb.attr("id") || "";
      let item_code = rawName;
      let item_group = null;

      if (rawName.includes("_")) {
        const [group, code] = rawName.split("_");
        item_group = (group || "Package").trim();
        item_code = (code || rawName).trim();
      } else {
        item_group =
          $cb.closest(".space-y-4").find("> h3").text().trim() || "Package";
      }

      const typ = ($cb.attr("data-type") || "other").trim().toLowerCase(); // room | service | other
      const rateNum = number($cb.attr("data-price"));
      const origin = $cb.hasClass("package-option") ? "package" : "addon";

      // إدخال 0 مع كونه متعلّم عليه: احذف
      if (val <= 0) {
        $cb.prop("checked", false);
        $qty.val(0);
        const rmIdx = add_ons.findIndex((x) => x.item_code === item_code);
        if (rmIdx > -1) add_ons.splice(rmIdx, 1);
        render_summary();
        update_lock_state?.();
        return;
      }

      // 🔒 القيود عند عناصر الباكج من نوع room/service
      if (origin === "package" && (typ === "room" || typ === "service")) {
        const limit =
          typ === "room"
            ? number(package_rules.rooms_max)
            : number(package_rules.services_max);

        // ✅ إجمالي الاستخدام من نفس النوع (package + addon) باستثناء الحالي
        const othersUsedAll = add_ons
          .filter((x) => x.type === typ && x.item_code !== item_code)
          .reduce((a, b) => a + number(b.qty || 0), 0);

        const allowed = Math.max(0, limit - othersUsedAll);

        if (allowed <= 0) {
          // مفيش سماحية خالص: شيل الاختيار
          $cb.prop("checked", false);
          $qty.val(0);
          const rmIdx = add_ons.findIndex((x) => x.item_code === item_code);
          if (rmIdx > -1) add_ons.splice(rmIdx, 1);
          frappe.show_alert({
            message: __("Limit reached for " + typ),
            indicator: "red",
          });
          render_summary();
          update_lock_state?.();
          return;
        }

        // ✂️ قص الكمية على الحد المسموح
        const newVal = Math.min(val, allowed);
        $qty.val(newVal);

        const idx = add_ons.findIndex((x) => x.item_code === item_code);
        if (idx > -1) {
          add_ons[idx].qty = newVal;
          add_ons[idx].item_group = item_group;
          add_ons[idx].type = typ;
          add_ons[idx].rate = rateNum;
          add_ons[idx].origin = origin;
        } else {
          add_ons.push({
            item_code,
            qty: newVal,
            item_group,
            type: typ,
            rate: rateNum,
            origin,
          });
        }
      } else {
        // add-on أو other: بدون حدود
        const idx = add_ons.findIndex((x) => x.item_code === item_code);
        if (idx > -1) {
          add_ons[idx].qty = val;
          add_ons[idx].item_group = item_group;
          add_ons[idx].type = typ;
          add_ons[idx].rate = rateNum;
          add_ons[idx].origin = origin;
        } else {
          add_ons.push({
            item_code,
            qty: val,
            item_group,
            type: typ,
            rate: rateNum,
            origin,
          });
        }
      }

      render_summary();
      update_lock_state?.();
    }
  );

  function create_new_quotation(dialogValues, payload) {
    console.log(payload);
    frappe.call({
      method: "frappe.client.insert",
      args: {
        doc: {
          doctype: "Quotation",
          quotation_type: "Package +",
          quotation_to: "Customer",
          transaction_date: frappe.datetime.get_today(),
          party_name: dialogValues.customer,
          valid_till_2: dialogValues.valid_till,
          custom_cost_center: dialogValues.cost_center,
          referral_sales_partner: dialogValues.referral_sales_partner,
          custom_package_type: payload.meta.custom_package_type,
          no_floors: payload.meta.no_floors,
          building_type: payload.meta.building_type,
          custom_floor_area: payload.meta.floor_area,
          custom_additionals: payload.meta.add_ons ? "Yes" : "No",
          custom_grand_totals: payload.totals.grand_total_estimated,
          items: payload.items
            .filter((item) => item.included_qty > 0)
            .map((item) => {
              return {
                item_code: item.item_code,
                qty: item.included_qty,
              };
            }),
          custom_additional_items: payload.meta.add_ons
            ? payload.items
                .filter((item) => item.extra_qty > 0)
                .map((item) => {
                  return {
                    item: item.item_code,
                    custom_qty: item.extra_qty,
                    rate: item.rate,
                  };
                })
            : [],
        },
      },
      callback: function (r) {
        if (!r.exc) {
          window.open(`/app/quotation/${r.message.name}`, "_blank");
          location.reload();
        }
      },
    });
  }

  //  submit quotation
  $wrapper
    .off("click" + NS)
    .on("click" + NS, ".submit_form", async function () {
      const meta = {
        building_type: $("#building-type").val() || null,
        floor_area: number($("#area-select").val()) || 0,
        no_floors:
          number($("#materials").find("option:selected").data("val")) || 0,
        custom_package_type: $("#features").val() || null,
        add_ons: $("#additional-features-select").val() === "yes",
        package_rules: package_rules || {},
      };

      if (!meta.building_type) {
        frappe.show_alert({
          message: __("Please select Building Type"),
          indicator: "red",
        });
        return;
      }
      if (meta.floor_area <= 0) {
        frappe.show_alert({
          message: __("Please enter a valid Floor Area"),
          indicator: "red",
        });
        return;
      }
      if (!meta.custom_package_type || meta.custom_package_type === "0") {
        frappe.show_alert({
          message: __("Please select a Package"),
          indicator: "red",
        });
        return;
      }

      const items = get_current_items().map((r) => ({
        item_code: r.item_code,
        qty: number(r.qty),
        rate: number(r.rate),
        type: r.type || "other",
        item_group: r.item_group || "Package",
        origin: r.origin || "addon",
      }));

      const { priced, totals } = price_with_package_rules(items);
      const base = number(package_rules.base_price || 0);
      const floorPrice = calc_floor_area_price();
      const buildingPrice = get_building_price();
      const floorsValue = get_no_floors_value();
      const grand_total_estimated =
        base +
        floorPrice +
        buildingPrice +
        floorsValue +
        number(totals.grand_total || 0);

      const payload = {
        meta,
        items: priced.map((p) => ({
          item_code: p.item_code,
          qty: number(p.qty),
          rate: number(p.rate),
          extra_qty: number(p.extra_qty),
          included_qty: number(p.included_qty),
          type: p.type,
          item_group: p.item_group,
          amount: number(p.amount),
          origin: p.origin || "addon",
        })),
        totals: {
          rooms_included_limit: number(totals.rooms_included_limit || 0),
          services_included_limit: number(totals.services_included_limit || 0),
          rooms_included_used: number(totals.rooms_included_used || 0),
          services_included_used: number(totals.services_included_used || 0),
          grand_total_addons: number(totals.grand_total || 0),
          package_price: base,
          floorPrice,
          buildingPrice,
          floorsValue,
          grand_total_estimated,
        },
      };

      let d = new frappe.ui.Dialog({
        title: __("Confirm Quotation"),
        fields: [
          { fieldtype: "Section Break" },
          {
            label: "Customer",
            fieldtype: "Link",
            fieldname: "customer",
            options: "Customer",
            reqd: 1,
          },
          {
            label: "Valid Till",
            fieldtype: "Date",
            fieldname: "valid_till",
            reqd: 1,
          },
          {
            label: "Cost Center",
            fieldtype: "Link",
            fieldname: "cost_center",
            options: "Cost Center",
            reqd: 1,
          },
          {
            label: "Referral Sales Partner",
            fieldtype: "Link",
            fieldname: "referral_sales_partner",
            options: "Sales Partner",
            reqd: 1,
          },
        ],

        primary_action_label: __("Create Quotation"),
        primary_action(values) {
          create_new_quotation(values, payload);
          d.hide();
        },
      });

      d.show();
    });
};

// 🧹 empty and clean up
frappe.pages["add-quotation-plus"].on_page_unload = function (wrapper) {
  const $wrapper = $(wrapper);
  const NS = ".addQuotationPlus";

  $wrapper.off(NS);
  $wrapper.removeData("aqp-initialized");
  $("#aqp-root").remove();
};
