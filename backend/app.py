# backend/app.py

import sys
from os.path import abspath, dirname

sys.path.insert(0, abspath(dirname(__file__)))


# backend/app.py

from backend import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)

