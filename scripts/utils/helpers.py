from dateutil.parser import parse

def parse_dates(dates, reset=False):
    try:
        dates = [parse(date) for date in dates]
        if reset:
            dates = [date.replace(month=1, day=1) for date in dates]
        return [date.isoformat(' ').split(' ')[0] for date in dates]
    except (ValueError, TypeError):
        return dates