import { skillCategories } from "@/constants";
import Motion from "./motion";

interface SkillProps {
  skill: (typeof skillCategories)[number]["skills"][number];
  skillIndex: number;
  categoryIndex: number;
}

interface CategoryProps {
  category: (typeof skillCategories)[number];
  categoryIndex: number;
}

function Skill({ skill, skillIndex, categoryIndex }: SkillProps) {
  return (
    <Motion
      element="div"
      key={skill.name}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: categoryIndex * 0.2 + skillIndex * 0.1,
      }}
    >
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {skill.name}
        </span>
        <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
          {skill.level}%
        </span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <Motion
          element="div"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1.5,
            ease: [0.34, 1.56, 0.64, 1],
            delay: categoryIndex * 0.2 + skillIndex * 0.1,
          }}
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer" />
        </Motion>
      </div>
    </Motion>
  );
}

export default function Category({ category, categoryIndex }: CategoryProps) {
  return (
    <Motion
      element="div"
      key={category.title}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: categoryIndex * 0.2 }}
      className="group relative p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl dark:shadow-gray-900/10 hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-300"
    >
      <div className="relative">
        <div className="flex items-center gap-4 mb-8">
          <Motion
            element="span"
            whileHover={{ scale: 1.1 }}
            className="p-3 bg-purple-500/10 dark:bg-purple-500/20 rounded-xl text-purple-600 dark:text-purple-400 ring-1 ring-purple-500/20 dark:ring-purple-500/30"
          >
            {category.icon}
          </Motion>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {category.title}
          </h3>
        </div>
        <div className="space-y-6">
          {category.skills.map((skill, skillIndex) => (
            <Skill
              key={skill.name}
              skill={skill}
              skillIndex={skillIndex}
              categoryIndex={categoryIndex}
            />
          ))}
        </div>
      </div>
    </Motion>
  );
}
