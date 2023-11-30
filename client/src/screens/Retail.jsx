import React from 'react';
import AccordionRetail from '../components/Accordion';
import "./retail.css";

const Retail = () => {


  const accordionData = [
      {
        title: 'Jersey Mike\'s',
        content: `At Jersey Mike’s, we offer a sub above – one that’s measured in more than inches or seconds ‘til served. We carefully consider every aspect of what we do – every slice, every sandwich, every order. Slicing meats and cheeses right in front of you is not only the tastiest way to make a sub sandwich – it’s the only authentic way. Same goes with fresh grilling cheese steaks. At Jersey Mike’s, we would have it no other way. Located on the first floor of Griffin Hall North.

ACCEPTED HERE
Meal Swipes are accepted at this location during the academic year from 5 PM - 8 PM on Monday - Thursday.

  A swipe includes your choice of Sub (from list below) + chips OR small cookie + fountain drink.

  Sub options for a swipe

                  Grilled Portabella Mushroom & Swiss
                  Chipotle Cheesesteak
                  Chipotle Chicken
                  Mike's Famous Philly
                  Mike's Chicken Philly
                  The Veggie
                  Tuna Fish
                  Turkey & Provolone
                  Ham & Provolone
                  Jersey Shore's Favorite`
      },
      {
        title: 'Cosi',
        content: `Cosi is a fast-casual restaurant that is known for its homemade flatbread. Incredibly delicious breakfast, lunch, and dinner favorites like soup, salad, bowls, melts, sandwiches and flatbread pizzas are made to order daily. Visit us on the first floor of the Honors College and Residence Hall.

ACCEPTED HERE
Meal Swipes are accepted at this location during the academic year from 11 AM - 2 PM on Monday - Friday, and 5 PM - 8 PM on Monday - Thursday. `
      },
      {
        title: 'Qdoba',
        content: `Serving up flame-grilled, hand-crafted, made in-house Mexican eats. Enjoy our hot and tasty burritos, bowls, tacos, and quesadillas. Located on the first floor of Meredith South residence hall.

ACCEPTED HERE
Meal Swipes are accepted at this location during the academic year from 11 AM - 2 PM on Monday - Saturday and from 5 PM - 8 PM on Sunday - Thursday.

  `
      },
      {
            title: 'Panera',
            content: `There's nothing better than freshly baked bread. Our sandwiches and baked goods are made on-location every day. Enjoy our salads, soups, and bowls too! Located on the first floor of Meredith South residence hall.

ACCEPTED HERE
Meal Swipes are accepted at this location during the academic year from 11 AM - 2 PM on Monday - Saturday, and from 5 PM - 8 PM on Monday - Thursday.`
      },
      {
            title: 'Freshens',
            content: `A healthy “fresh casual” concept, which offers prepared to order food inspired by fresh ingredients. Stop by for our rice bowls, wraps, flatbreads, and salads, as well as our signature fresh blended smoothies. Located in the Cordova Recreation Center.

ACCEPTED HERE
Meal Swipes are accepted at this location during the academic year from 5 PM - 8 PM on Monday - Thursday.

  `
      },
      {
                title: 'Famous Frank\'s @ Cary Knight Spot',
                content: `Open late to satisfy all your pub grub cravings- stop by for hot dogs, sandwiches, fries, shakes and more. Located in the basement of Cary Quad South.

ACCEPTED HERE
Meal Swipes are accepted at this location during the academic year from 5 PM - 8 PM on Sunday - Thursday. Meal swipe options include choice of any sandwich, quesadilla, salad, 2 chili cheese dogs, or 2 Chicago dogs. Swipe also includes a fountain drink and choice of fries, chips, or chips and salsa.    `
          }
    ];




  return (
    <div>
      <h1>Retail Dining Locations</h1>
      <div className="accordion">
        {accordionData.map(({ title, content }) => (
          <AccordionRetail title={title} content={content} />
        ))}
      </div>
    </div>
  );
};

export default Retail;