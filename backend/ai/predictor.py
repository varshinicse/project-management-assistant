from datetime import datetime
from typing import Dict, Any

def predict_delay(progress: int, deadline: datetime) -> Dict[str, str]:
    """
    LOCAL AI LOGIC: Predicts project delay risk.
    This doesn't use an external API. It uses 'Heuristics' (smart rules).
    """
    now = datetime.utcnow()
    time_total = (deadline - now).total_seconds()
    
    if time_total <= 0:
        if progress < 100:
            return {"risk": "High", "action": "Immediate attention required. Deadline passed."}
        return {"risk": "Low", "action": "Task completed."}
    
    days_left = time_total / (24 * 3600)
    
    # RULE 1: If deadline is very near (< 3 days) and progress is low (< 50%) -> HIGH RISK
    if days_left < 3 and progress < 50:
        return {"risk": "High", "action": "Assign more resources or extend deadline."}
    
    # RULE 2: If we have context of a week left but very little progress (< 30%) -> HIGH RISK
    elif days_left < 7 and progress < 30:
        return {"risk": "High", "action": "Highly critical. Progress is significantly behind."}
    
    # RULE 3: If deadline is within 2 weeks but work is only half done -> MEDIUM RISK
    elif days_left < 14 and progress < 50:
        return {"risk": "Medium", "action": "Monitor progress closely."}
    
    # DEFAULT: Otherwise, we assume it's on track
    return {"risk": "Low", "action": "On track."}

def detect_wrong_status(status: str, progress: int) -> str:
    """
    LOCAL AI LOGIC: Error detection for status updates.
    Ensures that the user doesn't make logical mistakes in status reporting.
    """
    # MISTAKE 1: Marking as Done when work isn't finished
    if status == "Done" and progress < 80:
        return "Task status may be incorrect (Done but < 80% progress). Please verify."
    
    # MISTAKE 2: Saying it's In Progress but no work has started
    elif status == "In Progress" and progress == 0:
        return "Task is 'In Progress' but progress is 0%."
    
    # MISTAKE 3: Saying it's To Do but work has already started
    elif status == "To Do" and progress > 0:
        return "Task is 'To Do' but progress is > 0%."
    
    return None
