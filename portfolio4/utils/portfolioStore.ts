import { reactive, computed } from 'vue';
import defaultDevConfig from '../developer.json';

const state = reactive({
  portfolioData: null as any,
});

export const setPortfolioData = (data: any) => {
  state.portfolioData = data;
};

export const usePortfolioConfig = () => {
  const mergedConfig = computed(() => {
    if (!state.portfolioData) {
      return defaultDevConfig;
    }

    const d = state.portfolioData;
    const name = d.full_name || d.name || defaultDevConfig.name;
    const role = d.headline || d.role || defaultDevConfig.role;

    return {
      ...defaultDevConfig,
      name,
      logo_name: name.toLowerCase().replace(/\s+/g, '-'),
      role,
      about: {
        ...defaultDevConfig.about,
        sections: {
          ...defaultDevConfig.about.sections,
          'personal-info': {
            ...defaultDevConfig.about.sections['personal-info'],
            info: {
              ...defaultDevConfig.about.sections['personal-info'].info,
              bio: {
                ...defaultDevConfig.about.sections['personal-info'].info.bio,
                description: d.bio || d.about || defaultDevConfig.about.sections['personal-info'].info.bio.description,
              },
            },
          },
        },
      },
      contacts: {
        ...defaultDevConfig.contacts,
        direct: {
          ...defaultDevConfig.contacts.direct,
          sources: {
            ...defaultDevConfig.contacts.direct.sources,
            email: d.email || defaultDevConfig.contacts.direct.sources.email,
          },
        },
        find_me_also: {
          ...defaultDevConfig.contacts.find_me_also,
          sources: {
            ...defaultDevConfig.contacts.find_me_also.sources,
            github: d.social?.github || defaultDevConfig.contacts.find_me_also.sources.github,
            linkedin: d.social?.linkedin || defaultDevConfig.contacts.find_me_also.sources.linkedin,
          },
        },
      },
      projects: d.projects !== undefined
        ? d.projects.map((p: any, idx: number) => ({
            id: idx + 1,
            title: p.title || p.name || `Project ${idx + 1}`,
            description: p.description || '',
            image: p.image_url || p.image || p.src || '',
            tech: p.technologies || p.tags || ['web'],
            link: p.live_url || p.link || '#',
            github: p.github_url || p.github || '#',
          }))
        : defaultDevConfig.projects,
    };
  });

  return {
    config: mergedConfig.value,
    setPortfolioData,
  };
};
