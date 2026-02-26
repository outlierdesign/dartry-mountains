import HeroSection from "@/components/storyblok/HeroSection";
import EditorialStory from "@/components/storyblok/EditorialStory";
import Timeline from "@/components/storyblok/Timeline";
import ImageTextSplit from "@/components/storyblok/ImageTextSplit";
import PartnerGrid from "@/components/storyblok/PartnerGrid";
import CTABlock from "@/components/storyblok/CTABlock";
import ScrollReveal from "@/components/shared/ScrollReveal";

export const metadata = {
  title: "The Project",
};

export default function TheProjectPage() {
  return (
    <main>
      {/* Cinematic Hero Section */}
      <ScrollReveal>
        <HeroSection
          variant="cinematic"
          heading="The Project"
          subheading="A collaborative conservation initiative to protect and enhance the ecological heritage of the Dartry Mountains."
          eyebrow="Conservation in Action"
        />
      </ScrollReveal>

      {/* Editorial Story - Mission */}
      <ScrollReveal>
        <EditorialStory
          heading="Our Mission"
          eyebrow="The Vision"
          content="The Dartry Mountains conservation project is a multi-agency collaborative initiative established to protect and enhance the ecological and cultural heritage of this exceptional landscape. Coordinated by the National Parks and Wildlife Service (NPWS), the project brings together local councils, the farming community, and environmental agencies to deliver integrated conservation outcomes. Funded by the European Agricultural Fund for Rural Development, the project operates within the framework of the EU Natura 2000 network, ensuring that conservation efforts meet the highest European standards for habitat and species protection."
        />
      </ScrollReveal>

      {/* Timeline Section */}
      <ScrollReveal>
        <Timeline
          heading="Project Milestones"
          description="Key moments in the conservation journey of the Dartry Mountains."
          milestones={[
            {
              date: "2018",
              title: "Project Inception",
              description: "Initial stakeholder consultations and feasibility study commenced.",
            },
            {
              date: "2019",
              title: "EU Funding Secured",
              description: "Funding approved under the European Agricultural Fund for Rural Development.",
            },
            {
              date: "2020",
              title: "Baseline Surveys",
              description: "Comprehensive ecological surveys of habitats, species, and land use patterns completed.",
            },
            {
              date: "2021",
              title: "Farm Plans Developed",
              description: "Individual conservation farm plans created with participating landowners.",
            },
            {
              date: "2022",
              title: "Habitat Restoration",
              description: "Active restoration of blanket bog and limestone grassland habitats commenced.",
            },
            {
              date: "2023",
              title: "Community Engagement",
              description: "Education programme launched with local schools and community groups.",
            },
            {
              date: "2024",
              title: "Monitoring & Evaluation",
              description: "Long-term ecological monitoring framework established.",
            },
          ]}
        />
      </ScrollReveal>

      {/* Image + Text Split - Farmers */}
      <ScrollReveal>
        <ImageTextSplit
          heading="Working with Farmers"
          eyebrow="Farming & Conservation"
          content="The success of the Dartry Mountains conservation project depends on close collaboration with the local farming community. Farmers play a vital role in managing the landscape through grazing practices that maintain the short grassland essential for protected species. Red-billed chough, in particular, rely on this carefully managed sward to feed near their cliff-face nesting sites. By working together, we demonstrate that conservation and farming can thrive as complementary land uses, benefiting both biodiversity and rural livelihoods."
          image_position="right"
        />
      </ScrollReveal>

      {/* Image + Text Split - Science */}
      <ScrollReveal>
        <ImageTextSplit
          heading="Scientific Research"
          eyebrow="Evidence-Based Conservation"
          content="Our approach is grounded in rigorous scientific investigation. Comprehensive ecological surveys have mapped the distribution of habitats, documented species populations, and established baseline conditions against which we measure progress. Ongoing bird monitoring tracks populations of chough, peregrine falcons, and other upland species. Habitat mapping has identified priority areas for restoration and management. This evidence-based approach ensures that every conservation decision is informed by robust data, allowing us to adapt and improve our strategies over time."
          image_position="left"
        />
      </ScrollReveal>

      {/* Partner Grid Section */}
      <ScrollReveal>
        <PartnerGrid
          heading="Project Partners"
          description="This project brings together key agencies and organisations."
          partners={[
            {
              name: "National Parks and Wildlife Service",
              description: "Lead coordinating agency responsible for conservation policy and protected area management.",
            },
            {
              name: "BirdWatch Ireland",
              description: "Expert partner providing ornithological surveys, species monitoring, and bird conservation guidance.",
            },
            {
              name: "Sligo County Council",
              description: "Local government partner supporting land management coordination and community engagement.",
            },
            {
              name: "Leitrim County Council",
              description: "Local government partner supporting land management coordination and community engagement.",
            },
            {
              name: "Teagasc",
              description: "Agriculture and food development authority providing technical advice on sustainable farming practices.",
            },
            {
              name: "The Heritage Council",
              description: "National organisation supporting cultural heritage protection and landscape conservation.",
            },
          ]}
        />
      </ScrollReveal>

      {/* CTA Block Section */}
      <ScrollReveal>
        <CTABlock
          heading="Support Conservation"
          description="Discover how you can contribute to protecting the Dartry Mountains."
          cta_label="Get in Touch"
          cta_link={{ cached_url: "/contact" }}
          cta_secondary_label="Environmental Stewardship"
          cta_secondary_link={{ cached_url: "/environmental-stewardship" }}
        />
      </ScrollReveal>
    </main>
  );
}
