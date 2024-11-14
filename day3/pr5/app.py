from flask import Flask, request, jsonify,render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')
    
@app.route('/api/track', methods=['POST'])
def track_event():
    event_data = request.json
    event_type = event_data.get('eventType')
    data = event_data.get('data')

    # Here you would add your logic to store the event data for analysis
    print(f"Received event '{event_type}' with data: {data}")

    return jsonify(success=True)

if __name__ == '__main__':
    app.run(debug=True)