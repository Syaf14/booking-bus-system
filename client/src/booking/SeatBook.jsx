import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserLayout from '../global/UserLayout';
import '../App.css'

const SeatIcon = ({ seat, isSelected, isBooked, onClick }) => {
    // Priority: Selection (Green) > Booked (Grey) > Active (Blue) > Inactive (Lighter Grey)
    let color = seat.active === 1 ? "#3c97b3" : "#e0e0e0"; 
    if (isBooked) color = "#d1d1d1"; // Grey for already taken
    if (isSelected) color = "#28a745"; // Green for current selection

    const isDisabled = seat.active === 0 || isBooked;

    return (
        <div 
            className="text-center position-relative mb-2" 
            onClick={isDisabled ? null : onClick} 
            style={{ 
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                width: "50px",
                transition: "all 0.2s ease",
                opacity: isDisabled ? 0.6 : 1
            }}
        >
            <div style={{ fontSize: "35px", color, transform: isSelected ? "scale(1.1)" : "scale(1)" }}>
                {seat.seat_type === "normal" ? (
                    <i className={`bi ${isSelected || isBooked ? "bi-square-fill" : "bi-square"}`}></i>
                ) : (
                    <i className="bi bi-person-standing"></i>
                )}
            </div>
            <small className="fw-bold d-block" style={{ fontSize: "10px", marginTop: "-5px" }}>
                {seat.seat_number}
            </small>
        </div>
    );
};

function SeatBook() {
    const { id } = useParams(); // scheduled_id from URL
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState(null); 
    const [busSeat, setBusSeat] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]); // Array of seat IDs already taken
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [bookingType, setBookingType] = useState("normal");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                
                // 1. Fetch Schedule Details
                const schedRes = await axios.get(`http://localhost:5000/api/scheduleManagement/get-schedule-by-id/${id}`);
                setSchedule(schedRes.data);

                // 2. Fetch All Seats for the layout
                const seatsRes = await axios.get(`http://localhost:5000/api/busManagement/get-bus-seat`);
                
                // 3. Fetch specifically which seats are already taken for THIS schedule
                // Note: If you haven't built this backend route yet, it might return 404. 
                // Catching it ensures the rest of the seats still show up.
                try {
                    const takenRes = await axios.get(`http://localhost:5000/api/bookingManagement/get-booked-seats/${id}`);
                    // Force everything to a Number to ensure the .includes() matches correctly
                    setBookedSeats(takenRes.data.map(b => Number(b.seat_id)));
                } catch (e) {
                    console.warn("Could not fetch taken seats, showing all as available.");
                }

                setBusSeat(seatsRes.data);
            } catch (err) { 
                console.error("Initialization error:", err); 
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    const groupSeats = () => {
        const rows = {};
        busSeat.forEach(seat => {
            if (seat.seat_type === "normal") {
                const rowLetter = seat.seat_number.charAt(0);
                if (!rows[rowLetter]) {
                    rows[rowLetter] = { left: [], right: [], standing: null };
                }
                const num = parseInt(seat.seat_number.slice(1));
                if (num <= 2) rows[rowLetter].left.push(seat);
                else rows[rowLetter].right.push(seat);
            }
            if (seat.seat_type === "standing") {
                const index = parseInt(seat.seat_number.slice(1));
                const rowLetter = String.fromCharCode(64 + index);
                if (!rows[rowLetter]) {
                    rows[rowLetter] = { left: [], right: [], standing: null };
                }
                rows[rowLetter].standing = seat;
            }
        });
        return rows;
    };

    const handleSelect = (seat) => {
        // Prevent selecting if inactive or already booked
        if (seat.active === 0 || bookedSeats.includes(seat.id)) return;
        setSelectedSeat(seat);
    };

    const confirmBooking = async () => {
        if (!selectedSeat) return alert("Please select a seat first!");
        
        try {
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('role');
            const bookingData = {
                scheduled_id: id,
                seat_id: selectedSeat.id,
                booking_type: bookingType,
                // user_id is NOT sent here; backend handles it via token
            };

            const response = await axios.post(
                'http://localhost:5000/api/bookingManagement/add-booking', 
                bookingData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 201) {
                alert(`Success! Seat ${selectedSeat.seat_number} has been booked.`);
                // Use response data to navigate to the specific user's ticket page
                if (role === 'class rep'){
                   navigate(`/ticket-class-rep/${response.data.user_id}`); 
                } else {
                    navigate(`/ticket/${response.data.user_id}`);
                }
            }

        } catch (err) {
            console.error("Booking error:", err);
            alert(err.response?.data?.message || "Failed to book seat");
        }
    };

    if (loading || !schedule) return <div className="p-5 text-center">Loading Bus Layout...</div>;
    
    const seatRows = groupSeats();

    return (
        <UserLayout>
            <div className='container py-5' style={{ marginBottom: '15vh' }}>
                <div className="row justify-content-center">
                    
                    {/* BUS CABIN */}
                    <div className="col-md-5">
                        <div className="bus-shell bg-white shadow-lg p-4 position-relative" 
                             style={{ 
                                 border: "4px solid #35557E", 
                                 borderRadius: "40px 40px 10px 10px", 
                                 minHeight: "700px" 
                             }}>
                            
                            <div className="text-center border-bottom pb-3 mb-4">
                                <div className="d-flex justify-content-around align-items-center">
                                    <div className="p-2 border rounded-circle bg-light"><i className="bi bi-shield-shaded fs-4 text-muted"></i></div>
                                    <div className="small fw-bold text-uppercase text-muted">Front / Driver</div>
                                    <div className="p-2 border rounded-circle"><i className="bi bi-compass fs-4 text-dark animate-spin"></i></div>
                                </div>
                            </div>

                            <div className="bus-cabin-interior px-2">
                                {Object.keys(seatRows).sort().map((rowLetter) => (
                                    <div key={rowLetter} className="d-flex justify-content-between align-items-center mb-1">
                                        <div className="d-flex gap-1">
                                            {seatRows[rowLetter].left.map(seat => (
                                                <SeatIcon 
                                                    key={seat.id} 
                                                    seat={seat}
                                                    isBooked={bookedSeats.includes(seat.id)}
                                                    isSelected={selectedSeat?.id === seat.id} 
                                                    onClick={() => handleSelect(seat)}
                                                />
                                            ))}
                                        </div>

                                        <div className="text-muted small border-start border-end px-3 flex-grow-1 text-center" 
                                             style={{ height: "60px", backgroundColor: "#f8f9fa" }}>
                                            {seatRows[rowLetter].standing ? (
                                                 <SeatIcon 
                                                    seat={seatRows[rowLetter].standing}
                                                    isBooked={bookedSeats.includes(seatRows[rowLetter].standing.id)}
                                                    isSelected={selectedSeat?.id === seatRows[rowLetter].standing.id} 
                                                    onClick={() => handleSelect(seatRows[rowLetter].standing)}
                                                />
                                            ) : <div className="mt-2 opacity-25">Aisle</div>}
                                        </div>

                                        <div className="d-flex gap-1">
                                            {seatRows[rowLetter].right.map(seat => (
                                                <SeatIcon 
                                                    key={seat.id} 
                                                    seat={seat}
                                                    isBooked={bookedSeats.includes(seat.id)}
                                                    isSelected={selectedSeat?.id === seat.id} 
                                                    onClick={() => handleSelect(seat)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* SIDE PANEL */}
                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm p-4 sticky-top" style={{ top: "100px" }}>
                            <h4 className="fw-bold mb-4" style={{ color: "#35557E" }}>Trip Summary</h4>
                            <div className="mb-4">
                                <label className="text-muted small text-uppercase fw-bold">Schedule Info</label>
                                <div className="d-flex align-items-center mt-2">
                                    <i className="bi bi-info-square-fill text-primary me-3 fs-3"></i>
                                    <div>
                                        <div className="fw-bold">{schedule.bus_code}</div>
                                        <div className="small text-muted">{schedule.depart_location} → {schedule.arrive_location}</div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <h6 className="fw-bold mb-3">Seat Legend</h6>
                            <div className="d-grid gap-2">
                                <div className="d-flex align-items-center">
                                    <div style={{ width: "20px", height: "20px", background: "#3c97b3", borderRadius: "4px" }} className="me-2"></div>
                                    <small>Available</small>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div style={{ width: "20px", height: "20px", background: "#28a745", borderRadius: "4px" }} className="me-2"></div>
                                    <small>Your Selection</small>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div style={{ width: "20px", height: "20px", background: "#d1d1d1", borderRadius: "4px" }} className="me-2"></div>
                                    <small>Booked / Occupied</small>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* BAR */}
            <div className='fixed-bottom shadow-lg' style={{ background: "#ffffff", borderTop: "4px solid #28a745", height: "20vh", zIndex: "1000" }}>
                <div className='container h-100 d-flex align-items-center justify-content-between'>
                    <div>
                        <p className="mb-0 text-muted small text-uppercase">You've Picked</p>
                        <h4 className="fw-bold mb-0 text-dark">
                            Seat {selectedSeat ? selectedSeat.seat_number : "--"}
                        </h4>
                    </div>
                    <div>
                        <div className="d-flex p-1 bg-light rounded-pill border mb-2" style={{ position: 'relative' }}>                           
                            {/* Student Option */}
                            <div className="flex-fill">
                            <input 
                                type="radio" 
                                className="btn-check" 
                                name="booking_type" 
                                id="bookingNormal" 
                                value="normal"
                                checked={bookingType === "normal"}
                                onChange={(e) => setBookingType(e.target.value)}
                            />
                            <label 
                                className="btn btn-booking-type-toggle w-100 rounded-pill border-0 py-2 fw-bold" 
                                htmlFor="bookingNormal"
                            >
                                Normal
                            </label>
                            </div>

                            {/* Class Rep Option */}
                            <div className="flex-fill">
                            <input 
                                type="radio" 
                                className="btn-check" 
                                name="booking_type" 
                                id="bookingClass" 
                                value="class"
                                checked={bookingType === "class"}
                                onChange={(e) => setBookingType(e.target.value)} 
                            />
                            <label 
                                className="btn btn-booking-type-toggle w-100 rounded-pill border-0 py-2 fw-bold" 
                                htmlFor="bookingClass"
                            >
                                Class
                            </label>
                            </div>
                        </div>
                        <button 
                            className={`btn btn-lg px-5 fw-bold rounded-pill ${selectedSeat ? 'btn-success shadow' : 'btn-secondary opacity-50'}`}
                            disabled={!selectedSeat}
                            onClick={confirmBooking}
                        >
                            PROCEED TO BOOK
                        </button>                        
                    </div>

                </div>
            </div>
        </UserLayout>
    );
}

export default SeatBook;