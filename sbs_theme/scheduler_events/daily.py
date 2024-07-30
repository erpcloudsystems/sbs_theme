from __future__ import unicode_literals
import frappe
from frappe import _
from ksa.ksa.saudi_arabia.utils.py import create_qr_code

frappe.whitelist()
def daily():
    sales_invoices = frappe.get_all("Sales Invoice",{"docstatus":1},["name"])
    for row in sales_invoices:
        sales_invoice = frappe.get_doc("Sales Invoice",row["name"])
        create_qr_code(sales_invoice)    
