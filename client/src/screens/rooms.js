import moment from 'moment';

function generateRandomRooms() {
    const buildings = ["Krach", "Young Hall", "WALC"];
    const roomTypes = ["classroom", "recreational"];
    const rooms = [];

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateTimeSlot() {
        let startHour = getRandomInt(0, 23);
        let startMinute = getRandomInt(0, 1) * 30;
        let duration = getRandomInt(0, 11) * 30; // 30 mins to 6 hours

        let endHour = startHour + Math.floor((startMinute + duration) / 60);
        let endMinute = (startMinute + duration) % 60;

        if (endHour >= 24) return null; // Invalid time slot

        return `${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}-${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;
    }

    function generateRandomDate() {
        const startDate = moment('2023-10-29');
        const endDate = moment('2023-11-03');
        let diff = endDate.diff(startDate, 'days');
        return startDate.add(getRandomInt(0, diff), 'days').format('YYYY-MM-DD');
    }

    for (let building of buildings) {
        for (let i = 0; i < 20; i++) {
            let reservedTimeSlots = [];
            for (let j = 0; j < getRandomInt(1, 5); j++) {
                let slot = generateTimeSlot();
                if (slot) reservedTimeSlots.push(slot);
            }

            let reservedDates = reservedTimeSlots.map(() => generateRandomDate());

            rooms.push({
                building: building,
                roomNumber: String(i + 1 + buildings.indexOf(building)*20).padStart(3, '0'),
                capacity: getRandomInt(5, 100),
                type: roomTypes[getRandomInt(0, 1)],
                reservedTimeSlots: reservedTimeSlots,
                reservedDates: reservedDates
            });
        }
    }

    return {
        rooms: rooms
    };
}

let dummyRooms = generateRandomRooms();

export default dummyRooms;
