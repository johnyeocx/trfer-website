import SocialMediaImage from "../../../public/images/classes/social_media.jpg";
import ChatGPT from "../../../public/images/classes/chatgpt.jpg";
import Programming from "../../../public/images/classes/programming.jpg";
import Wireframe from "../../../public/images/classes/wireframe.jpg";

import Person1 from "../../../public/images/classes/people/1.jpg";
import Person2 from "../../../public/images/classes/people/2.jpg";
import Person3 from "../../../public/images/classes/people/3.jpg";
import Person4 from "../../../public/images/classes/people/4.jpg";

export const classData = [
	{
		title: "Marketing",
		courses: [
			{
				id: 0,
				image: SocialMediaImage,
				title: "How to start your social media brand",
				creatorId: 1,
				creatorName: "Anna Chase",
				currency: "GBP",
				price: 0.0,
				hour: 1,
				minute: 30,
				link: "",
				creatorImage: Person1,
			},
			{
				id: 1,
				image: ChatGPT,
				title: "Prompting ChatGPT for agencies",
				creatorId: 2,
				creatorName: "Ben Sokleps",
				currency: "GBP",
				price: 0.0,
				hour: 2,
				// minute: 30,
				link: "",
				creatorImage: Person2,
			},
			{
				id: 2,
				image: Programming,
				title: "The fundamentals of programming",
				creatorId: 3,
				creatorName: "Tracy Liu",
				currency: "GBP",
				price: 0.0,
				hour: 1,
				minute: 15,
				link: "",
				creatorImage: Person3,
			},
			{
				id: 3,
				image: Wireframe,
				title: "Moving from Figma to Webflow",
				creatorId: 4,
				creatorName: "Ivan Jones",
				currency: "GBP",
				price: 0.0,
				hour: 1,
				minute: 30,
				link: "",
				creatorImage: Person4,
			},
		],
	},
	{
		title: "Marketing",
		courses: [],
	},
];
