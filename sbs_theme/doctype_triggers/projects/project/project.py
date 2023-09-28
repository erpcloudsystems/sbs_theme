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
        "subject": "Transmitting The Responsibility of Project From Sales to Operation",
        "project": doc.name,

    })
    new_doc.insert(ignore_permissions=True)


@frappe.whitelist()
def onload(doc, method=None):
    pass


@frappe.whitelist()
def before_validate(doc, method=None):
    pass


def is_exist(subject, project):
    return frappe.db.sql(f"""
        SELECT COUNT(*)
        FROM `tabTask`
        WHERE subject = '{subject}'
        AND project = '{project}'
    """)[0][0] > 0


@frappe.whitelist()
def validate(doc, method=None):
    if doc.workflow_state == "Site Survey Confirmation":
        new_doc = frappe.get_doc({
            "doctype": "Task",
            "subject": "Site Survey Confirmation",
            "project": doc.name,

        })
        if is_exist(new_doc.subject, doc.name):
            return
        new_doc.insert(ignore_permissions=True)

    if doc.workflow_state == "Site Survey":
        new_doc = frappe.get_doc({
            "doctype": "Task",
            "subject": "Site Survey",
            "project": doc.name,

        })
        if is_exist(new_doc.subject, doc.name):
            return
        new_doc.insert(ignore_permissions=True)

    if doc.workflow_state == "Match The QTY With Survey":
        new_doc = frappe.get_doc({
            "doctype": "Task",
            "subject": "Match The QTY With Survey",
            "project": doc.name,

        })
        if is_exist(new_doc.subject, doc.name):
            return
        new_doc.insert(ignore_permissions=True)

    if doc.workflow_state == "Adding Items For The Project":
        new_doc = frappe.get_doc({
            "doctype": "Task",
            "subject": "Not Approved QTY By Project Managment",
            "project": doc.name,

        })
        if is_exist(new_doc.subject, doc.name):
            return
        new_doc.insert(ignore_permissions=True)

    if doc.workflow_state == "Inform The Customer Of Adding Items":
        new_doc = frappe.get_doc({
            "doctype": "Task",
            "subject": "Inform The Customer Of Adding Items",
            "project": doc.name,

        })
        if is_exist(new_doc.subject, doc.name):
            return
        new_doc.insert(ignore_permissions=True)

    if doc.workflow_state == "Customer Decision Of Adding Items":
        new_doc = frappe.get_doc({
            "doctype": "Task",
            "subject": "Adding Items",
            "project": doc.name,

        })
        if is_exist(new_doc.subject, doc.name):
            return
        new_doc.insert(ignore_permissions=True)

    if doc.workflow_state == "Inapplicable Project":
        new_doc = frappe.get_doc({
            "doctype": "Task",
            "subject": "Inapplicable Project",
            "project": doc.name,

        })
        if is_exist(new_doc.subject, doc.name):
            return
        new_doc.insert(ignore_permissions=True)

    if doc.workflow_state == "Modifiction in The Project":
        new_doc = frappe.get_doc({
            "doctype": "Task",
            "subject": "Modifiction in The Project",
            "project": doc.name,

        })
        if is_exist(new_doc.subject, doc.name):
            return
        new_doc.insert(ignore_permissions=True)

    if doc.workflow_state == "Preference Option":
        new_doc = frappe.get_doc({
            "doctype": "Task",
            "subject": "Preference Option",
            "project": doc.name,

        })
        if is_exist(new_doc.subject, doc.name):
            return
        new_doc.insert(ignore_permissions=True)

    if doc.workflow_state == "Inform The Customer That a Changes Must be Implemented in the Project":
        new_doc = frappe.get_doc({
            "doctype": "Task",
            "subject": "Inform The Customer That a Changes Must be Implemented in the Project",
            "project": doc.name,

        })
        if is_exist(new_doc.subject, doc.name):
            return
        new_doc.insert(ignore_permissions=True)

    if doc.workflow_state == "Customer Decision of The Changes must be implemented":
        new_doc = frappe.get_doc({
            "doctype": "Task",
            "subject": "Changes must be implemented",
            "project": doc.name,

        })
        if is_exist(new_doc.subject, doc.name):
            return
        new_doc.insert(ignore_permissions=True)

    if doc.workflow_state == "Commette of Inplicble Project":
        new_doc = frappe.get_doc({
            "doctype": "Task",
            "subject": "Commette of Inplicble Project",
            "project": doc.name,

        })
        if is_exist(new_doc.subject, doc.name):
            return
        new_doc.insert(ignore_permissions=True)

    if doc.workflow_state == "Termination of Contract":
        new_doc = frappe.get_doc({
            "doctype": "Task",
            "subject": "Termination of Contract",
            "project": doc.name,

        })
        if is_exist(new_doc.subject, doc.name):
            return
        new_doc.insert(ignore_permissions=True)

    if doc.workflow_state == "Return The Money to The Client":
        new_doc = frappe.get_doc({
            "doctype": "Task",
            "subject": "Return The Money to The Client",
            "project": doc.name,

        })
        if is_exist(new_doc.subject, doc.name):
            return
        new_doc.insert(ignore_permissions=True)

    if doc.workflow_state == "End Of The Project":
        new_doc = frappe.get_doc({
            "doctype": "Task",
            "subject": "End Of The Project",
            "project": doc.name,

        })
        if is_exist(new_doc.subject, doc.name):
            return
        new_doc.insert(ignore_permissions=True)

    if doc.workflow_state == "Approved Final QTY":
        new_doc = frappe.get_doc({
            "doctype": "Task",
            "subject": "Initial Drawing",
            "project": doc.name,

        })
        if is_exist(new_doc.subject, doc.name):
            return
        new_doc.insert(ignore_permissions=True)

        new_doc = frappe.get_doc({
            "doctype": "Task",
            "subject": "Forcasting Project Requirments & Time",
            "project": doc.name,


        })
        if is_exist(new_doc.subject, doc.name):
            return
        new_doc.insert(ignore_permissions=True)


        # new_doc = frappe.get_doc({
        #     "doctype": "Task",
        #     "subject": "Forcasting Project Requirments & Time",
        #     "project": doc.name,
        #     "workflow_state":"Forcasting Project Requirments & Time",


        # })
        # if is_exist(new_doc.subject, doc.name):
        #     return
        # new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Initial Drawing":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Initial Drawing",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Deliver Final Drawing":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Deliver Final Drawing",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Super Vision Cabling":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Super Vision-Cabling",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Super Vision Cabling":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Super Vision-Cabling",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Electric Smart Approval":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Electric Smart Approval",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Cables Sorting & Labling ,Testing":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Cables Sorting & Labling ,Testing",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Quality Control of Cables Sorting & Labling ,Testing":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Quality Control of Cables Sorting & Labling ,Testing",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Forwarding The -Cabels Report-  To Programmers":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Forwarding The -Cabels Report-  To Programmers",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Forcasting Project Requirments & Time":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Forcasting Project Requirments & Time",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Warehouse Supply Check":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Warehouse Supply Check",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Inform The Project Mangment if The Requirments Are Availble":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Inform The Project Mangment if The Requirments Are Availble",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Purchasing Order Of Project Requirements":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Purchasing Order Of Project Requirements",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Forward The Bill draft to Finance":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Forward The Bill draft to Finance",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Finance Approve":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Finance Approve",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Getting A Bill From Supplier":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Getting A Bill From Supplier",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Receipt of the ordered items":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Receipt of the ordered items",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Inform The Project Managment All Project Requirments Are Availble":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Inform The Project Managment All Project Requirments Are Availble",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    if doc.workflow_state == "Inform The Project Managment All Project Requirments Are Availble":
        new_doc = frappe.get_doc({
            "doctype": "Task",
            "subject": "Order to Release Cabinet Plate Devices ",
            "project": doc.name,

        })
        if is_exist(new_doc.subject, doc.name):
            return
        new_doc.insert(ignore_permissions=True)

        new_doc = frappe.get_doc({
            "doctype": "Task",
            "subject": "Delivery Date & Time of Cabinet Frame and Preparing Cabinet Stuff",
            "project": doc.name,

        })
        if is_exist(new_doc.subject, doc.name):
            return
        new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Delivery Date & Time of Cabinet Frame and Preparing Cabinet Stuff":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Delivery Date & Time of Cabinet Frame",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Deliver Cabinet Frame To The Project":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Deliver Cabinet Frame To The Project",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Prepare The Cabinet Location":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Prepare The Cabinet Location",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Quality Control Of Preparing Cabinet Location":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Quality Control Of Preparing Cabinet Location",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Order to Release Cabinet Plate Devices":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Order to Release Cabinet Plate Devices",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Install Devices inhouse":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Install Devices inhouse",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Quality Control Of Installing The Cabinet Plate Devices":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Quality Control Of Installing The Cabinet Plate Devices",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Inhouse Programming":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Inhouse Programming",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Notice Of -Availabe Requirments Of Project-":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Notice Of -Availabe Requirments Of Project-",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Notice Of -Availabe Requirments Of Project-":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Notice Of -Availabe Requirments Of Project-",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Notice Of Supply Delivery":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Notice Of Supply Delivery",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Supply Approval":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Supply Approval",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Choosing Date Of Start Working With Customer":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Choosing Date Of Start Working With Customer",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Inform Supply Chain The Date To Deliver Items":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Inform Supply Chain The Date To Deliver Items",
    #         "project": doc.name,

        # })
        # if is_exist(new_doc.subject, doc.name):
        #     return
        # new_doc.insert(ignore_permissions=True)

    if doc.workflow_state == "Release the Stock & Dilever to The Project Location":
        new_doc = frappe.get_doc({
            "doctype": "Task",
            "subject": "Install Ceiling devices & Networking System & Seciurity & Power Interfaces",
            "project": doc.name,

        })
        if is_exist(new_doc.subject, doc.name):
            return
        new_doc.insert(ignore_permissions=True)

        new_doc = frappe.get_doc({
            "doctype": "Task",
            "subject": "Install The Cabinet Plate With Devices",
            "project": doc.name,

        })
        if is_exist(new_doc.subject, doc.name):
            return
        new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Install Ceiling devices & Networking System & Seciurity & Power Interfaces":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Install Ceiling devices & Networking System & Seciurity & Power Interfaces",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Quality Control Of Ceiling devices & Install Networking System":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Quality Control Of Ceiling devices & Install Networking System",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Programming The Networking & Seciurity":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Programming The Networking & Seciurity",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Quality Control Of Programming The Networking & Seciurity":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Quality Control Of Programming The Networking & Seciurity",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Mobile Application Downloading Through Programming Scanning QR":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Mobile Application Downloading",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Mobile Application Downloading Through Programming Scanning QR":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Mobile Application Downloading",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Quality Control Programming list ( Check )":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Quality Control Programming list ( Check )",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Install The Cabinet Plate With Devices":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Install The Cabinet Plate With Devices",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Quality Control Of Install The Cabinet Plate With Devices":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Quality Control Of Install The Cabinet Plate With Devices",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Installing Interfaces":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Installing Interfaces",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Quality Control Of Installing Interfaces":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Quality Control Of Installing Interfaces",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Notice Sales Depratment of Completing Project":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Notice Sales Depratment of Completing Project",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Deliver The Project":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Deliver The Project",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Training On System":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Training On System",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Contact With Customer":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Contact With Customer",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)

    # if doc.workflow_state == "Claim the last Payment":
    #     new_doc = frappe.get_doc({
    #         "doctype": "Task",
    #         "subject": "Claim the last Payment",
    #         "project": doc.name,

    #     })
    #     if is_exist(new_doc.subject, doc.name):
    #         return
    #     new_doc.insert(ignore_permissions=True)


@frappe.whitelist()
def before_save(doc, method=None):
    pass


@frappe.whitelist()
def on_update(doc, method=None):
    pass
