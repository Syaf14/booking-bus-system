import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserLayout from '../global/UserLayout';

const SeatIcon = ({ seat, isSelected, onClick }) => {
    // Colors based on status
    let color = seat.active === 1 ? "#3c97b3" : "#d1d1d1"; // Active blue vs Booked light grey
    if (isSelected) color = "#28a745"; // Selected Green

    return (
        <div 
            className="text-center position-relative mb-2" 
            onClick={onClick} 
            style={{ 
                cursor: seat.active === 1 ? 'pointer' : 'not-allowed',
                width: "50px",
                transition: "all 0.2s ease"
            }}
        >
            <div style={{ fontSize: "35px", color, transform: isSelected ? "scale(1.1)" : "scale(1)" }}>
                {seat.seat_type === "normal" ? (
                    <i className={`bi ${isSelected ? "bi-square-fill" : "bi-square"}`}></i>
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
    const { id } = useParams();
    const [schedule, setSchedule] = useState(null); 
    const [busSeat, setBusSeat] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState(null);

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

    useEffect(() => {
        const fetchScheduleDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/scheduleManagement/get-schedule-by-id/${id}`);
                setSchedule(response.data);           
            } catch (err) { console.error(err); }  
        };
        const fetchBusSeat = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/busManagement/get-bus-seat`);
                setBusSeat(response.data);
            } catch (err) { console.error(err); }
        };
        fetchScheduleDetail();
        fetchBusSeat();
    }, [id]);

    const handleSelect = (seat) => {
        if (seat.active === 0) return;
        setSelectedSeat(seat);
    };

    const confirmBooking = async () => {
        if (!selectedSeat) return alert("Please select a seat first!");
        try {
            const bookingData = {
                scheduled_id: id,      // From useParams
                seat_id: selectedSeat.id,
                user_id: 1,           // Replace with actual logged-in user ID
            };

            const response = await axios.post('http://localhost:5000/api/bookingManagement/add-booking', bookingData);
            if (response.status === 201) {
                alert(`Success! Seat ${selectedSeat.seat_number} has been booked.`);
                // Refresh the page or update state to show the seat as booked (grey)
                window.location.reload();
            }

        } catch (err) {
            console.error("Booking error:", err);
            alert(err.response?.data?.message || "Failed to book seat");
        }
    };

    if (!schedule) return <div className="p-5 text-center">Loading Bus Layout...</div>;
    const seatRows = groupSeats();

    return (
        <UserLayout>
            <div className='container py-5' style={{ marginBottom: '15vh' }}>
                <div className="row justify-content-center">
                    
                    {/* BUS CABIN (Vertical Style) */}
                    <div className="col-md-5">
                        <div className="bus-shell bg-white shadow-lg p-4 position-relative" 
                             style={{ 
                                 border: "4px solid #35557E", 
                                 borderRadius: "40px 40px 10px 10px", 
                                 minHeight: "700px" 
                             }}>
                            
                            {/* Front of Bus Indicator */}
                            <div className="text-center border-bottom pb-3 mb-4">
                                <div className="d-flex justify-content-around align-items-center">
                                    <div className="p-2 border rounded-circle bg-light">
                                        <i className="bi bi-shield-shaded fs-4 text-muted"></i>
                                    </div>
                                    <div className="small fw-bold text-uppercase text-muted">Front / Driver</div>
                                    <div className="p-2 border rounded-circle">
                                        <i className="bi bi-compass fs-4 text-dark animate-spin"></i>
                                    </div>
                                </div>
                            </div>

                            {/* Seat Mapping */}
                            <div className="bus-cabin-interior px-2">
                                {Object.keys(seatRows).sort().map((rowLetter) => (
                                    <div key={rowLetter} className="d-flex justify-content-between align-items-center mb-1">
                                        {/* LEFT COLUMN */}
                                        <div className="d-flex gap-1">
                                            {seatRows[rowLetter].left.map(seat => (
                                                <SeatIcon 
                                                    key={seat.id} 
                                                    seat={seat}
                                                    isSelected={selectedSeat?.id === seat.id} 
                                                    onClick={() => handleSelect(seat)}
                                                />
                                            ))}
                                        </div>

                                        {/* AISLE / STANDING */}
                                        <div className="text-muted small border-start border-end px-3 flex-grow-1 text-center" 
                                             style={{ height: "60px", backgroundColor: "#f8f9fa", borderStyle: "dashed !important" }}>
                                            {seatRows[rowLetter].standing ? (
                                                 <SeatIcon 
                                                    seat={seatRows[rowLetter].standing}
                                                    isSelected={selectedSeat?.id === seatRows[rowLetter].standing.id} 
                                                    onClick={() => handleSelect(seatRows[rowLetter].standing)}
                                                />
                                            ) : (
                                                <div className="mt-2 opacity-25">Aisle</div>
                                            )}
                                        </div>

                                        {/* RIGHT COLUMN */}
                                        <div className="d-flex gap-1">
                                            {seatRows[rowLetter].right.map(seat => (
                                                <SeatIcon 
                                                    key={seat.id} 
                                                    seat={seat}
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

                    {/* INFORMATION PANEL */}
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
                                    <small>Available Seat</small>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div style={{ width: "20px", height: "20px", background: "#28a745", borderRadius: "4px" }} className="me-2"></div>
                                    <small>Your Selection</small>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div style={{ width: "20px", height: "20px", background: "#d1d1d1", borderRadius: "4px" }} className="me-2"></div>
                                    <small>Already Booked</small>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* BOTTOM BOOKING BAR */}
            <div className='fixed-bottom shadow-lg' style={{ background: "#ffffff", borderTop: "4px solid #28a745", height: "12vh", zIndex: "1000" }}>
                <div className='container h-100 d-flex align-items-center justify-content-between'>
                    <div className="d-flex align-items-center">
                        <div className="bg-light p-3 rounded-circle me-3">
                            <i className="bi bi-armchair fs-3 text-success"></i>
                        </div>
                        <div>
                            <p className="mb-0 text-muted small text-uppercase">You've Picked</p>
                            <h4 className="fw-bold mb-0 text-dark">
                                Seat {selectedSeat ? selectedSeat.seat_number : "--"}
                            </h4>
                        </div>
                    </div>
                    
                    <button 
                        className={`btn btn-lg px-5 fw-bold rounded-pill transition-all ${selectedSeat ? 'btn-success shadow' : 'btn-secondary opacity-50'}`}
                        disabled={!selectedSeat}
                        onClick={confirmBooking}
                    >
                        {selectedSeat ? 'PROCEED TO BOOK' : 'SELECT A SEAT'}
                    </button>
                </div>
            </div>
        </UserLayout>
    );
}

export default SeatBook;