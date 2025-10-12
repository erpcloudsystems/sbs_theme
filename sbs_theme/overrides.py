
import datetime

import frappe
from frappe import _
from frappe.model.document import Document
from  erpnext.crm.doctype.appointment.appointment import Appointment
from  erpnext.crm.doctype.lead.lead import Lead
from frappe.utils import get_url, getdate, now


from erpnext.crm.doctype.appointment_booking_settings.appointment_booking_settings import AppointmentBookingSettings
def save(self):
    super(AppointmentBookingSettings, self).save()

class CustomAppointment(Appointment):
   def send_confirmation_email(self):
        pass

class CustomLead(Lead):
    def validate(self):
        self.set_full_name()
        self.set_lead_name()
        self.set_title()
        self.set_status()
        # self.check_email_id_is_unique()
        self.validate_email_id()