from __future__ import unicode_literals
import frappe
from frappe import _
from datetime import date


@frappe.whitelist()
def before_insert(doc, method=None):
    pass
@frappe.whitelist()
def after_insert(doc, method=None):
    pass
@frappe.whitelist()
def onload(doc, method=None):
    pass
@frappe.whitelist()
def before_validate(doc, method=None):
    pass
@frappe.whitelist()
def validate(doc, method=None):
    today = date.today()
    # frappe.db.set_value('Task', doc.name, 'status', doc.task_status)
    # frappe.db.sql(""" update `tabTask` set status = '{task_status}' where name = '{name}'  """.format(task_status=doc.task_status,name=doc.name))
    # doc.status = "Completed"

    if doc.subject == "Transmitting The Responsibility of Project From Sales to Operation" and doc.task_status == "Completed":
        new_subject = "Site Survey Confirmation"
        project = frappe.get_doc('Project', doc.project)
        new_doc = frappe.get_doc({
		"doctype": "Task",
		"subject" : new_subject ,
		"project" : doc.project ,
        	                })
        new_doc.insert(ignore_permissions=True)
        project.workflow_state = new_subject
        doc.status = "Completed"
        doc.completed_on = today
       
        ######################################################
    if doc.subject == "Site Survey Confirmation" and doc.task_status == "Completed":
        new_subject = "Initial Drawing"  
        project = frappe.get_doc('Project', doc.project)
        new_doc = frappe.get_doc({
		"doctype": "Task",
		"subject" : new_subject ,
		"project" : doc.project ,
        	                })
        new_doc.insert(ignore_permissions=True)
        project.workflow_state = new_subject
        doc.status = "Completed"
        doc.completed_on = today
       
        ###################################################### 
    if doc.subject == "Initial Drawing" and doc.task_status == "Completed":
        new_subject = "Site Survey"  
        project = frappe.get_doc('Project', doc.project)
        new_doc = frappe.get_doc({
		"doctype": "Task",
		"subject" : new_subject ,
		"project" : doc.project ,
        	                })
        new_doc.insert(ignore_permissions=True)
        project.workflow_state = new_subject
        doc.status = "Completed"
        doc.completed_on = today
       
        ######################################################
    if doc.subject == "Site Survey" and doc.task_status == "Completed":
        new_subject = "Match The QTY With Survey & Check The Intial Drawing"  
        project = frappe.get_doc('Project', doc.project)
        new_doc = frappe.get_doc({
		"doctype": "Task",
		"subject" : new_subject ,
		"project" : doc.project ,
        	                })
        new_doc.insert(ignore_permissions=True)
        project.workflow_state = new_subject
        doc.status = "Completed"
        doc.completed_on = today
       
        ######################################################
    if doc.task_status == "Inapplicable Project" and doc.subject == "Match The QTY With Survey & Check The Intial Drawing" :
        new_subject = "Modifiction in The Project" 
        project = frappe.get_doc('Project', doc.project)
        new_doc = frappe.get_doc({
		"doctype": "Task",
		"subject" : new_subject ,
		"project" : doc.project ,
        	                })
        new_doc.insert(ignore_permissions=True)
        project.workflow_state = new_subject
        doc.status = "Completed"
        doc.completed_on = today
        #######################################################
    if doc.task_status == "Completed" and doc.subject == "Modifiction in The Project" :
        new_subject = "Preference Option" 
        project = frappe.get_doc('Project', doc.project)
        new_doc = frappe.get_doc({
		"doctype": "Task",
		"subject" : new_subject ,
		"project" : doc.project ,
        	                })
        new_doc.insert(ignore_permissions=True)
        project.workflow_state = new_subject  
        doc.status = "Completed"
        doc.completed_on = today
        #######################################################
    if doc.task_status == "Completed" and doc.subject == "Preference Option" :
        new_subject = "Inform The Customer That a Changes Must be Implemented in the Project" 
        project = frappe.get_doc('Project', doc.project)
        new_doc = frappe.get_doc({
		"doctype": "Task",
		"subject" : new_subject ,
		"project" : doc.project ,
        	                })
        new_doc.insert(ignore_permissions=True)
        project.workflow_state = new_subject  
        doc.status = "Completed"
        doc.completed_on = today
        #######################################################
    if doc.task_status == "Accept" and doc.subject == "Inform The Customer That a Changes Must be Implemented in the Project" :
        new_subject = "Approved Final QTY" 
        project = frappe.get_doc('Project', doc.project)
        new_doc = frappe.get_doc({
		"doctype": "Task",
		"subject" : new_subject ,
		"project" : doc.project ,
        	                })
        new_doc.insert(ignore_permissions=True)
        project.workflow_state = new_subject  
        doc.status = "Completed"
        doc.completed_on = today
        #######################################################

    if doc.task_status == "Decline" and doc.subject == "Inform The Customer That a Changes Must be Implemented in the Project" :
        new_subject = "Termination of Contract" 
        project = frappe.get_doc('Project', doc.project)
        new_doc = frappe.get_doc({
		"doctype": "Task",
		"subject" : new_subject ,
		"project" : doc.project ,
        	                })
        new_doc.insert(ignore_permissions=True)
        project.workflow_state = new_subject  
        doc.status = "Completed"
        doc.completed_on = today
        #######################################################
    if doc.task_status == "Completed" and doc.subject == "Termination of Contract" :
        new_subject = "Return The Money to The Client" 
        project = frappe.get_doc('Project', doc.project)
        new_doc = frappe.get_doc({
		"doctype": "Task",
		"subject" : new_subject ,
		"project" : doc.project ,
        	                })
        new_doc.insert(ignore_permissions=True)
        project.workflow_state = new_subject  
        doc.status = "Completed"
        doc.completed_on = today
        #######################################################
    if doc.task_status == "Approved QTY By Project Managment" and doc.subject == "Match The QTY With Survey & Check The Intial Drawing" :
        new_subject = "Approved Final QTY" 
        project = frappe.get_doc('Project', doc.project)
        new_doc = frappe.get_doc({
		"doctype": "Task",
		"subject" : new_subject ,
		"project" : doc.project ,
        	                })
        new_doc.insert(ignore_permissions=True)
        project.workflow_state = new_subject
        doc.status = "Completed"
        doc.completed_on = today
        #######################################################
    if doc.task_status == "Not Approved QTY By Project Managment" and doc.subject == "Match The QTY With Survey & Check The Intial Drawing" :
        new_subject = "Inform The Customer Of Adding Items" 
        project = frappe.get_doc('Project', doc.project)
        new_doc = frappe.get_doc({
		"doctype": "Task",
		"subject" : new_subject ,
		"project" : doc.project ,
        	                })
        new_doc.insert(ignore_permissions=True)
        project.workflow_state = new_subject
        doc.status = "Completed"
        doc.completed_on = today
        #######################################################
    if doc.task_status == "Accept" and doc.subject == "Inform The Customer Of Adding Items" :
        new_subject = "Approved Final QTY" 
        project = frappe.get_doc('Project', doc.project)
        new_doc = frappe.get_doc({
		"doctype": "Task",
		"subject" : new_subject ,
		"project" : doc.project ,
        	                })
        new_doc.insert(ignore_permissions=True)
        project.workflow_state = new_subject
        doc.status = "Completed"
        doc.completed_on = today
        #######################################################
    if doc.task_status == "Completed" and doc.subject == "Approved Final QTY" :
        doc.status = "Completed"
        doc.completed_on = today
         #######################################################
@frappe.whitelist()
def before_save(doc, method=None):
    pass
@frappe.whitelist()
def on_update(doc, method=None):
    pass
