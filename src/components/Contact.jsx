import React, { useCallback, useState, useMemo } from "react";
import { FiUser, FiPhone, FiCalendar, FiClock, FiCheck, FiInfo, FiX } from 'react-icons/fi';


const Contact = () => {


    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [selectedServices, SetSelectedServices] = useState([]);

    const services = useMemo(() => [
        "Hair Styling",
        "Facial Treatment",
        "Manicure/Pedicure",
        "Massage Therapy",
        "Makeup Artistry",
        "Hair Coloring",
        "Waxing",
        "Skin Care",
        "Body Treatment",
        "Others"
    ], []);


    const validateForm = useCallback(() => {
        const errors = {};
        if (!name.trim()) errors.name = 'Name is required.';
        if (!phone.trim()) errors.phone = 'Phone number is required.';
        else if (!/^\d{10}$/.test(phone)) errors.phone = 'Phone number must be exactly 10 digits.';
        if (selectedServices.length === 0) errors.services = 'Please select at least one service.';
        if (!date) errors.date = 'Date is required.';
        if (!time) errors.time = 'Time is required.';
        return errors;
    }, [name, phone, selectedServices, date, time]);


    const toggleServices = useCallback((services) => {
        SetSelectedServices(prev =>
            prev.includes(services) ? prev.filter(s => s !== services)
                : [...prev, services]
        )
    }, []);


    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setIsSubmitting(true);

        const message = `Name: ${name}%0APhone: ${phone}%0AServices: ${selectedServices.join(', ')}%0ADate: ${date}%0ATime: ${time}`;

        setTimeout(() => {
            //  window.open(`https://wa.me/+91?text=${message}`, '_blank')
            setName('');
            setPhone('');
            SetSelectedServices('');
            setDate('');
            setTime('');

            setIsSubmitting(false);
            alert("Your appointment has been successfully booked!");
            setTimeout(() => {
                window.location.reload();
            }, 3000)
        }, 1000)

    })

    return (
        <section id="contact" className="py-20 bg-yellow-50 min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-2xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-[Poppins] bg-gradient-to-r from-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                        Book Your Beauty Session
                    </h2>
                    <p className="text-yellow-600 text-lg sm:text-xl font-medium">
                        Let us create your perfect beauty experience
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-3xl
            shadow-xl p-6 sm:p-8 border-2 border-yellow-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {/* name field */}
                        <div className="relative group">
                            <FiUser className="absolute left-4 top-4 text-yellow-400 text-xl" />
                            <input type="text" placeholder="Your Full Name" value={name}
                                onChange={(e) => { setName(e.target.value) }} className="w-full pl-12 pr-4 py-4
                              rounded-xl border-2 border-yellow-100 focus:border-yellow-400
                              focus:ring-2 focus:ring-yellow-200 transition-all duration-300 placeholder-yellow-300
                              text-yellow-700 font-medium"/>
                            {errors.name && (
                                <p className="text-red-400 text-sm mt-1 ml-2 flex items-center gap-1">
                                    <FiInfo className="inline" />
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="relative group">
                            <FiPhone className="absolute left-4 top-4 text-yellow-400 text-xl" />
                            <input type="tel" placeholder="Phone Number" value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} className="w-full pl-12 pr-4 py-4
                              rounded-xl border-2 border-yellow-100 focus:border-yellow-400
                              focus:ring-2 focus:ring-yellow-200 transition-all duration-300 placeholder-yellow-300
                              text-yellow-700 font-medium"/>
                            {errors.phone &&
                                <p className="text-red-400 text-sm mt-1 ml-2 flex items-center gap-1">
                                    {errors.phone}
                                </p>
                            }
                        </div>

                        {/* SERVICES SECTION */}
                        <div className="md:col-span-2">
                            <label className="block text-yellow-700 text-lg font-medium
                            mb-3 sm:mb-4">Select Services</label>

                            {/* SERVICES TAGS */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {selectedServices.map(services => {
                                    return (
                                        <div key={services} className="flex items-center bg-yellow-100 rounded-full
                                    px-4 py-2 text-yellow-700 font-medium transition-all hover:bg-yellow-200">
                                            <span>{services}</span>
                                            <button type="button" onClick={() => toggleServices(services)}
                                                className="ml-2 hover:text-yellow-900">
                                                <FiX className="w-4 h-4" />

                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                            {/* SERVICES GRID OPTIONS */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {services.map((services) => (
                                    <div key={services} onClick={() => toggleServices(services)}
                                        className={`flex items-center p-4 rounded-xl cursor-pointer transition-all ${selectedServices.includes(services) ? 'bg-yellow-500 text-white shadow-lg' : 'bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-100'}`}>
                                        <div className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center ${selectedServices.includes(services)
                                            ? 'bg-white text-yellow-500' : 'bg-yellow-200 text-transparent'
                                            }`}>
                                            <FiCheck className="w-4 h-4" />

                                        </div>
                                        <span className="ml-3 text-sm font-medium">
                                            {services}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {errors.services && <p className="text-red-400 text-sm mt-2">
                                {errors.services}
                            </p>}

                        </div>
                        {/* DATE */}
                        <div className="relative group">
                            <FiCalendar className="absolute left-4 top-4 text-yellow-400 text-xl" />
                            <input type="date" value={date}
                                onChange={(e) => { setDate(e.target.value) }} className="w-full pl-12 pr-4 py-4
                              rounded-xl border-2 border-yellow-100 focus:border-yellow-400
                              focus:ring-2 focus:ring-yellow-200 transition-all duration-300 placeholder-yellow-300
                              text-yellow-700 font-medium"/>
                            {errors.date &&
                                <p className="text-red-400 text-sm mt-1 ml-2 flex items-center gap-1">
                                    {errors.date}
                                </p>
                            }
                        </div>

                        <div className="relative group">
                            <FiClock className="absolute left-4 top-4 text-yellow-400 text-xl" />
                            <input type="time" value={time}
                                onChange={(e) => { setTime(e.target.value) }} className="w-full pl-12 pr-4 py-4
                              rounded-xl border-2 border-yellow-100 focus:border-yellow-400
                              focus:ring-2 focus:ring-yellow-200 transition-all duration-300 placeholder-yellow-300
                              text-yellow-700 font-medium"/>
                            {errors.time &&
                                <p className="text-red-400 text-sm mt-1 ml-2 flex items-center gap-1">
                                    {errors.time}
                                </p>
                            }
                        </div>



                    </div>
                    {/* SUBMIT BUTTON */}
                    <button type="submit" disabled={isSubmitting}
                        className={`w-full mt-6 sm:mt-8 bg-gradient-to-br from-yellow-400 to-yellow-600
                        text-white py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg shadow-lg
                        hover:shadow-yellow-200 hover:scale-[1.02] transition-all duration-300
                        ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}
                        `}
                    >
                        {isSubmitting ? "Scheduling Your Appointment...." : "Confirm Booking"}
                    </button>

                </form>
            </div>
        </section>
    )
}
export default Contact
