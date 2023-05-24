export default {
  name: 'work',
  title: 'Work',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'img',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Web Apps', value: 'webapps'},
          {title: 'Mobile Apps', value: 'mobileapps'},
          {title: 'Websites', value: 'websites'},
          {title: 'Design', value: 'design'},
          {title: 'Other', value: 'other'},
        ],
      },
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
    },
    {
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
    },
    {
      name: 'client',
      title: 'Client',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
    },
    {
      name: 'team',
      title: 'Team',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
}
