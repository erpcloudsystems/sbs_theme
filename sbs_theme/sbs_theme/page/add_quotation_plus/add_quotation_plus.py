import frappe
from frappe.utils import getdate

@frappe.whitelist()
def get_items(item_group: str):
    """Return items in a given item_group with latest valid rate from Item Price (no raw SQL)."""
    if not item_group:
        frappe.throw("item_group is required")

    today = getdate()

    items = frappe.get_all(
        "Item",
        filters={"item_group": item_group, "disabled": 0},
        fields=["name", "item_code", "item_name", "item_group"],
        order_by="item_name asc",
        limit_page_length=0,
    )
    if not items:
        return []

    item_codes = [i["item_code"] for i in items if i.get("item_code")]
    if not item_codes:
        return [{**i, "rate": None} for i in items]

    prices = frappe.get_all(
        "Item Price",
        filters={
            "item_code": ["in", item_codes],
        },
        fields=[
            "item_code", "price_list_rate", "valid_from", "valid_upto", "modified"
        ],
        order_by="valid_from desc, modified desc",
        limit_page_length=0,
    )

    def is_valid(p) -> bool:
        vf = p.get("valid_from")
        vu = p.get("valid_upto")
        return (vf is None or getdate(vf) <= today) and (vu is None or getdate(vu) >= today)

    latest_rate_by_code = {}
    for p in prices:
        code = p.get("item_code")
        if not code:
            continue
        if not is_valid(p):
            continue
        if code not in latest_rate_by_code:
            latest_rate_by_code[code] = p.get("price_list_rate")

    result = []
    for it in items:
        rate = latest_rate_by_code.get(it.get("item_code"))
        it["rate"] = float(rate) if rate is not None else None
        result.append(it)

    return result
