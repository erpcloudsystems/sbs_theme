
frappe.ui.form.on("Sales Invoice", "custom_update_qr", function(frm) {
    frappe.call({
        method:"sbs_theme.doctype_triggers.accounting.sales_invoice.sales_invoice.update_qr_code"
    })
});
