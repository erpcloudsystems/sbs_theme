
import datetime

import frappe
from frappe import _
from frappe.model.document import Document
from  erpnext.crm.doctype.appointment.appointment import Appointment
from frappe.utils import get_url, getdate, now


from erpnext.crm.doctype.appointment_booking_settings.appointment_booking_settings import AppointmentBookingSettings
def save(self):
    super(AppointmentBookingSettings, self).save()

class CustomAppointment(Appointment):
   def send_confirmation_email(self):
        pass
