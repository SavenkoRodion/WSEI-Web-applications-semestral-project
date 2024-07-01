import { StoryPriority, StoryStatus } from "../entities/Story";

type CreateStoryRequest = {
  name: string;
  description: string;
  priority: StoryPriority;
  projectId: string;
  status: StoryStatus;
  ownerUserId: string;
};

export default CreateStoryRequest;
