import { graphql } from "gatsby";

type GroupItem = {
  fieldValue: string;
  totalCount: number;
};

export interface GroupProps {
  data: {
    allMdx: {
      group: GroupItem[];
    };
  };
}

export const query = graphql`
  fragment Group on MdxConnection {
    group(field: $field) {
      fieldValue
      totalCount
    }
  }
`;
