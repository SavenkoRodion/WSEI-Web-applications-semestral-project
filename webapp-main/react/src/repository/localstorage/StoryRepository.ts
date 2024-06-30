import IRepository from "@savenkorodion/repository-interfaces/sync/ICrudRepository";
import authorize from "../../decorators/authorize";
import localStorageConfigs from "../../localStorageConfigs";
import { Story } from "@savenkorodion/webapp-model/entities/Story";

class StoryRepository implements IRepository<Story> {
  @authorize()
  create(story: Story) {
    const storyList: Story[] = this.getAll();
    storyList.push(story);

    localStorage.setItem(localStorageConfigs.story, JSON.stringify(storyList));
    return true;
  }

  @authorize()
  getAll() {
    const fromStorage = localStorage.getItem(localStorageConfigs.story) ?? "[]";
    const parsed: Story[] = JSON.parse(fromStorage);
    return parsed;
  }

  @authorize()
  delete(id: string): boolean {
    if (!id.trim()) return false;

    const storyList: Story[] = this.getAll();
    const index = storyList.map((e) => e.id).indexOf(id);

    if (index !== -1) {
      storyList.splice(index, 1);
      localStorage.setItem(
        localStorageConfigs.story,
        JSON.stringify(storyList)
      );
      return true;
    } else return false;
  }

  @authorize()
  replace(story: Story): boolean {
    const storyList: Story[] = this.getAll();
    const index = storyList.map((e) => e.id).indexOf(story.id);
    if (index !== -1) {
      storyList.splice(index, 1, story);
      localStorage.setItem(
        localStorageConfigs.story,
        JSON.stringify(storyList)
      );
      return true;
    } else return false;
  }
}

export default StoryRepository;
