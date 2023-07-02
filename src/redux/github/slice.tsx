import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "../../helpers/axios";
import { RootState } from "../rootReducer";

interface GithubTest {
  data: [],
  totalCount: number | null,
  loading: boolean,
  profile: []
}

interface reposListParams {
  page?: number;
  limit?: number;
}

interface repoProfileParams {
  owner: string | undefined;
  repo: string | undefined;
}

// ** Repository List
export const reposList = createAsyncThunk<any, reposListParams>(
  "reposList",
  async ({ page, limit }: reposListParams, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/search/repositories?q=created:>2021-06-01&sort=stars&order=desc&page=${page}&per_page=${limit}`);
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
      // toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: GithubTest = {
  data: [],
  totalCount: null,
  loading: false,
  profile: []
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
        state.reload = [];
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
      });
  },
});

export default githubSlice.reducer;

// Selectors
export const selectTest = (state: RootState) => state.github;
