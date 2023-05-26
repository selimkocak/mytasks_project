from datetime import datetime

# Convert a date string in "YYYY-MM-DD" format to "YYYY-MM-DDTHH:MM:SSZ" format
def convert_date_format(date_str):
    date = datetime.strptime(date_str, "%Y-%m-%d")
    return date.isoformat()

date_str = "2023-05-25"
new_date_str = convert_date_format(date_str)
print(new_date_str)  # Outputs: "2023-05-25T00:00:00"
