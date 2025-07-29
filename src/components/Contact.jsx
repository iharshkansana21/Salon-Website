import React, { useCallback, useState, useMemo } from "react";
import { FiUser, FiPhone, FiCalendar, FiClock, FiCheck, FiInfo, FiX, FiMapPin } from 'react-icons/fi';

const Contact = () => {

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');  // Added city state
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
        if (!email.trim()) errors.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email address is invalid.';
        if (!phone.trim()) errors.phone = 'Phone number is required.';
        else if (!/^\d{10}$/.test(phone)) errors.phone = 'Phone number must be exactly 10 digits.';
        if (!city.trim()) errors.city = 'City is required.';  // City validation
        if (selectedServices.length === 0) errors.services = 'Please select at least one service.';
        if (!date) errors.date = 'Date is required.';
        if (!time) errors.time = 'Time is required.';
        return errors;
    }, [name, email, phone, city, selectedServices, date, time]);

    const toggleServices = useCallback((service) => {
        SetSelectedServices(prev =>
            prev.includes(service) ? prev.filter(s => s !== service)
                : [...prev, service]
        );
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setIsSubmitting(true);

        const appointmentData = {
            name,
            email,
            phone,
            city, // Include city in data
            services: selectedServices,
            date,
            time,
        };

        try {
            const response = await fetch('https://harsh21.pythonanywhere.com/appointment/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert('Failed to book appointment: ' + (errorData.message || 'Unknown error'));
            } else {
                const data = await response.json();
                alert(data.message || 'Your appointment has been successfully booked!');
                // Clear form fields
                setName('');
                setEmail('');
                setPhone('');
                setCity('');  // Clear city field
                SetSelectedServices([]);
                setDate('');
                setTime('');
            }
        } catch (error) {
            alert('An error occurred: ' + error.message);
        }

        setIsSubmitting(false);
    }, [name, email, phone, city, selectedServices, date, time, validateForm]);

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

                <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-yellow-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

                        {/* Name */}
                        <div className="relative group">
                            <FiUser className="absolute left-4 top-4 text-yellow-400 text-xl" />
                            <input
                                type="text"
                                placeholder="Your Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-yellow-100 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all duration-300 placeholder-yellow-300 text-yellow-700 font-medium"
                            />
                            {errors.name && (
                                <p className="text-red-400 text-sm mt-1 ml-2 flex items-center gap-1">
                                    <FiInfo className="inline" />
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="relative group">
                            <FiUser className="absolute left-4 top-4 text-yellow-400 text-xl" />
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-yellow-100 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all duration-300 placeholder-yellow-300 text-yellow-700 font-medium"
                            />
                            {errors.email && (
                                <p className="text-red-400 text-sm mt-1 ml-2 flex items-center gap-1">
                                    <FiInfo className="inline" />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="relative group">
                            <FiPhone className="absolute left-4 top-4 text-yellow-400 text-xl" />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-yellow-100 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all duration-300 placeholder-yellow-300 text-yellow-700 font-medium"
                            />
                            {errors.phone && (
                                <p className="text-red-400 text-sm mt-1 ml-2 flex items-center gap-1">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* City */}
                        <div className="relative group">
                            <FiMapPin className="absolute left-4 top-4 text-yellow-400 text-xl" />
                            <input
                                type="text"
                                placeholder="Your City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-yellow-100 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all duration-300 placeholder-yellow-300 text-yellow-700 font-medium"
                            />
                            {errors.city && (
                                <p className="text-red-400 text-sm mt-1 ml-2 flex items-center gap-1">
                                    <FiInfo className="inline" />
                                    {errors.city}
                                </p>
                            )}
                        </div>

                        {/* Services */}
                        <div className="md:col-span-2">
                            <label className="block text-yellow-700 text-lg font-medium mb-3 sm:mb-4">Select Services</label>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {selectedServices.map(service => (
                                    <div
                                        key={service}
                                        className="flex items-center bg-yellow-100 rounded-full px-4 py-2 text-yellow-700 font-medium transition-all hover:bg-yellow-200"
                                    >
                                        <span>{service}</span>
                                        <button
                                            type="button"
                                            onClick={() => toggleServices(service)}
                                            className="ml-2 hover:text-yellow-900"
                                        >
                                            <FiX className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {services.map((service) => (
                                    <div
                                        key={service}
                                        onClick={() => toggleServices(service)}
                                        className={`flex items-center p-4 rounded-xl cursor-pointer transition-all ${
                                            selectedServices.includes(service)
                                                ? 'bg-yellow-500 text-white shadow-lg'
                                                : 'bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-100'
                                            }`}
                                    >
                                        <div
                                            className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center ${
                                                selectedServices.includes(service)
                                                    ? 'bg-white text-yellow-500'
                                                    : 'bg-yellow-200 text-transparent'
                                                }`}
                                        >
                                            <FiCheck className="w-4 h-4" />
                                        </div>
                                        <span className="ml-3 text-sm font-medium">{service}</span>
                                    </div>
                                ))}
                            </div>
                            {errors.services && <p className="text-red-400 text-sm mt-2">{errors.services}</p>}
                        </div>

                        {/* Date */}
                        <div className="relative group">
                            <FiCalendar className="absolute left-4 top-4 text-yellow-400 text-xl" />
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-yellow-100 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all duration-300 placeholder-yellow-300 text-yellow-700 font-medium"
                            />
                            {errors.date && (
                                <p className="text-red-400 text-sm mt-1 ml-2 flex items-center gap-1">
                                    {errors.date}
                                </p>
                            )}
                        </div>

                        {/* Time */}
                        <div className="relative group">
                            <FiClock className="absolute left-4 top-4 text-yellow-400 text-xl" />
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-yellow-100 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all duration-300 placeholder-yellow-300 text-yellow-700 font-medium"
                            />
                            {errors.time && (
                                <p className="text-red-400 text-sm mt-1 ml-2 flex items-center gap-1">
                                    {errors.time}
                                </p>
                            )}
                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full mt-6 sm:mt-8 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-yellow-200 hover:scale-[1.02] transition-all duration-300 ${
                            isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                            }`}
                    >
                        {isSubmitting ? "Scheduling Your Appointment...." : "Confirm Booking"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
