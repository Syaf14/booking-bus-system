import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserLayout from '../global/UserLayout';

const SeatIcon = ({ seat, isSelected, onClick }) => {
    // If it's selected, we make it a darker or different color
    // If it's inactive (booked), we keep it grey
    let color = seat.active === 1 ? "#0d3b66" : "#b0b0b0";
    if (isSelected) color = "#28a745"; // Change to green if selected

    return (
        <div 
            className="text-center" 
            onClick={onClick} 
            style={{ cursor: seat.active === 1 ? 'pointer' : 'not-allowed' }}
        >
            <div style={{ fontSize: "40px", color }}>
                {seat.seat_type === "normal" ? (
                    /* If isSelected is true, use the "fill" version of the Bootstrap icon */
                    <i className={`bi ${isSelected ? "bi-square-fill" : "bi-square"}`}></i>
                ) : (
                    <i className="bi bi-person-standing"></i>
                )}
            </div>
            <small>{seat.seat_number}</small>
        </div>
    );
};


function SeatBook() {
    const { id } = useParams();
    // Initialize as null instead of an empty array
    const [schedule, setSchedule] = useState(null); 
    const [busSeat, setBusSeat] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState(null);

    const groupSeats = () => {
        const rows = {};
        busSeat.forEach(seat => {
            if (seat.seat_type === "normal") {
                const rowLetter = seat.seat_number.charAt(0);

                if (!rows[rowLetter]) {
                    rows[rowLetter] = {
                        left: [],
                        right: [],
                        standing: null
                    };
                }

                const num = parseInt(seat.seat_number.slice(1));

                if (num <= 2)
                    rows[rowLetter].left.push(seat);
                else
                    rows[rowLetter].right.push(seat);
            }

            if (seat.seat_type === "standing") {
                const index = parseInt(seat.seat_number.slice(1));
                const rowLetter = String.fromCharCode(64 + index);

                if (!rows[rowLetter]) {
                    rows[rowLetter] = {
                        left: [],
                        right: [],
                        standing: null
                    };
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
            } catch (err) {
                console.error("Error fetching bus details:", err);
            }  
        };

        const fetchBusSeat = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/busManagement/get-bus-seat`);
                setBusSeat(response.data);
            } catch (err) {
                console.error("Error fetching seat detail:", err);
            }
        };
        fetchScheduleDetail();
        fetchBusSeat();
    }, [id]);

    const handleSelect = (seat) => {
        if (seat.active === 0) return; // Don't allow clicking taken seats
        setSelectedSeat(seat);
    };

    const confirmBooking = async () => {
        if (!selectedSeat) return alert("Please select a seat first!");

        try {
            const bookingData = {
                schedule_id: id,      // From useParams
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
    };;

    // Show a loading state while the data is being fetched
    if (!schedule) return <div>Loading...</div>;
    const seatRows = groupSeats();
    return (
        <UserLayout>
            <div className='d-flex justify-content-center' style={{ marginBottom: '12vh' }}>
                <div className="row col-md-12">
                    <div className="col-md-6">
                        <div className="card shadow-sm">
                            <div className="card-header bg-white">
                                <h5 className="mb-0">Select Your Seat</h5>
                            </div>
                            <div className="card-body text-center">
                                {Object.keys(seatRows).map((rowLetter) => (
                                    <div key={rowLetter} className="d-flex justify-content-center align-items-center mb-3">
                                        {/* LEFT SEATS */}
                                        <div className="d-flex gap-2">
                                            {seatRows[rowLetter].left.map(seat => (
                                                <SeatIcon 
                                                    key={seat.id} 
                                                    seat={seat}
                                                    isSelected={selectedSeat?.id === seat.id} 
                                                    onClick={() => handleSelect(seat)}
                                                />
                                            ))}
                                        </div>

                                        {/* STANDING AREA */}
                                        <div className="mx-4">
                                            {seatRows[rowLetter].standing && (
                                                <SeatIcon 
                                                    seat={seatRows[rowLetter].standing}
                                                    isSelected={selectedSeat?.id === seatRows[rowLetter].standing.id} 
                                                    onClick={() => handleSelect(seatRows[rowLetter].standing)}
                                                />
                                            )}
                                        </div>

                                        {/* RIGHT SEATS */}
                                        <div className="d-flex gap-2">
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

                    {/* Legend / Info Column */}
                    <div className="col-md-6">
                        <div className="p-3">
                            <h5>Legend</h5>
                            <div className="d-flex gap-3 mb-3">
                                <div><i className="bi bi-square text-secondary"></i> Available</div>
                                <div><i className="bi bi-square-fill text-success"></i> Selected</div>
                                <div><i className="bi bi-square text-light" style={{backgroundColor: '#b0b0b0'}}></i> Booked</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM FIXED BAR */}
            <div className='fixed-bottom w-100' style={{ background: "#0279a8", height: "12vh", zIndex: "1000", color: "white" }}>
                <div className='container h-100 d-flex align-items-center justify-content-between'>
                    <div>
                        <h6 className="mb-0">Selected Seat:</h6>
                        <span className="fs-4 fw-bold">
                            {selectedSeat ? selectedSeat.seat_number : "None"}
                        </span>
                    </div>
                    
                    <div className="text-end">
                        <button 
                            className="btn btn-warning btn-lg fw-bold" 
                            disabled={!selectedSeat}
                            onClick={confirmBooking}
                        >
                            CONFIRM BOOKING
                        </button>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}

export default SeatBook