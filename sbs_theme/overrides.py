
import datetime

import frappe
from frappe import _
from frappe.model.document import Document
from  erpnext.crm.doctype.appointment.appointment import Appointment
from frappe.utils import get_url, getdate, now



class CustomAppointment(Appointment):
   def send_confirmation_email(self):
        pass
