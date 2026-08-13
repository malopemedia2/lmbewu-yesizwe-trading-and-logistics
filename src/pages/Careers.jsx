import Section from "../components/Section";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";

export default function Careers() {
  return (
    <div>

      {/* HERO */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="bg-[#2E7D32] text-white py-20 text-center px-6"
      >
        <h1 className="text-4xl font-bold">Careers</h1>
        <p className="mt-3 text-gray-200">
          Join our growing logistics and mining team
        </p>
      </motion.section>

      {/* CONTENT */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <Section title="Work With Us">
          <motion.p variants={fadeUp} className="text-gray-600 text-center max-w-3xl mx-auto">
            We are always looking for skilled and motivated individuals.
          </motion.p>
        </Section>

        <Section title="Available Jobs" dark>
          <div className="grid md:grid-cols-3 gap-6">

            <motion.div variants={fadeUp} className="bg-green-900 p-6 rounded text-white">
              <h3 className="font-bold">Truck Drivers</h3>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-green-900 p-6 rounded text-white">
              <h3 className="font-bold">Fleet Assistants</h3>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-green-900 p-6 rounded text-white">
              <h3 className="font-bold">Cleaning Staff</h3>
            </motion.div>

          </div>
        </Section>
      </motion.div>

    </div>
  );
}