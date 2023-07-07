import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "../../helpers/axios";
import { RootState } from "../rootReducer";

interface GithubTest {
  data: [],
  totalCount? : number | null,
  loading: boolean,
  profile: [],
  languages: []
}

interface reposListParams {
  page?: number;
  limit?: number;
  language?: string | null;
  startDate?: any;
  endDate?: any;
}

interface repoProfileParams {
  owner: string | undefined;
  repo: string | undefined;
}

// ** Repository List
export const reposList = createAsyncThunk<any, reposListParams>(
  "reposList",
  async ({ page, limit, language, startDate, endDate }: reposListParams, { rejectWithValue }) => {
    try {
      let url = `/search/repositories?q=created:>2021-06-01`;
      
      if (language) {
        url += `+language:${language}`;
      }

      if (startDate && endDate) {
        const formattedStartDate = startDate.toISOString().split("T")[0];
        const formattedEndDate = endDate.toISOString().split("T")[0];
        url += `+created:${formattedStartDate}..${formattedEndDate}`;
      }

      url += `&sort=stars&order=desc&page=${page}&per_page=${limit}`;

      const response = await axiosApi.get(url);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// ** Repository Profile
export const repoProfile = createAsyncThunk<any, repoProfileParams, { rejectValue: any }>(
  "repoProfile",
  async ({ owner, repo }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/repos/${owner}/${repo}`);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchLanguages = createAsyncThunk("github/fetchLanguages", async () => {
  try {
    const response = await axiosApi.get("/languages");

    const languageOptions = response.data.map((language: any) => ({
      value: language.name,
      label: language.name
    }));

    languageOptions.unshift({ value: null, label: "All" });

    return languageOptions;
  } catch (error) {
    console.error("Error fetching languages:", error);
    throw error;
  }
});

const initialState: GithubTest = {
  data: [],
  totalCount: null,
  loading: false,
  profile: [],
  languages: []
};

const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(reposList.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(reposList.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.data = action.payload.items;
        state.isSuccess = false;
        state.totalCount = action.payload.total_count;
      })
      .addCase(reposList.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(repoProfile.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(repoProfile.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(repoProfile.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLanguages.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(fetchLanguages.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.languages = action.payload;
      })
      .addCase(fetchLanguages.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default githubSlice.reducer;

// Selectors
export const selectTest = (state: RootState) => state.github;
