import eel
from pyowm import OWM
from pyowm.utils.config import get_default_config
from datetime import datetime

config_dict = get_default_config()
config_dict['language'] = 'en'  

owm = OWM('8cb89b94e799072bf3bfd3c3a517926c')
mgr = owm.weather_manager()

@eel.expose
def get_weather(city, country):
    try:
        place = f"{city},{country}"
        observation = mgr.weather_at_place(place)
        w = observation.weather

        weather_data = {
            'status': w.detailed_status,
            'wind_speed': w.wind()['speed'],
            'humidity': w.humidity,
            'pressure': w.pressure['press'],
            'temp': w.temperature('celsius')['temp'],
            'temp_min': w.temperature('celsius')['temp_min'],
            'temp_max': w.temperature('celsius')['temp_max'],
            'date': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        return weather_data
    except Exception as e:
        return {"error": "City not found or an error occurred"}

@eel.expose
def get_weather_by_coords(lat, lon):
    try:
        observation = mgr.weather_at_coords(lat, lon)
        w = observation.weather

        weather_data = {
            'status': w.detailed_status,
            'wind_speed': w.wind()['speed'],
            'humidity': w.humidity,
            'pressure': w.pressure['press'],
            'temp': w.temperature('celsius')['temp'],
            'temp_min': w.temperature('celsius')['temp_min'],
            'temp_max': w.temperature('celsius')['temp_max'],
            'date': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        return weather_data
    except Exception as e:
        return {"error": "Could not retrieve weather data"}

eel.init('web')
eel.start('index.html', mode='edge', size=(400, 600))
        