from __future__ import unicode_literals
import frappe
from frappe import _


@frappe.whitelist()
def before_insert(doc, method=None):
    pass
@frappe.whitelist()
def after_insert(doc, method=None):
    new_doc = frappe.get_doc({
		"doctype": "Task",
		"subject" : "Transmitting The Responsibility of Project From Sales to Operation" ,
		"project" : doc.name ,
		
        	                })
    new_doc.insert(ignore_permissions=True)


@frappe.whitelist()
def onload(doc, method=None):
    pass
@frappe.whitelist()
def before_validate(doc, method=None):
    pass
@frappe.whitelist()
def validate(doc, method=None):
    pass
@frappe.whitelist()
def before_save(doc, method=None):
    pass
@frappe.whitelist()
def on_update(doc, method=None):
    pass
